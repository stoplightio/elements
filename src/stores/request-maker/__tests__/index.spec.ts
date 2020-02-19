import { safeStringify } from '@stoplight/json';
import { HttpParamStyles } from '@stoplight/types';
import axios from 'axios';
import 'jest-enzyme';
import { RequestMakerStore } from '..';
import { stringToArrayBuffer } from '../../../utils/arrayBuffer';

describe('RequestMakerStore', () => {
  let requestMaker: RequestMakerStore;

  beforeEach(() => {
    requestMaker = new RequestMakerStore();
  });

  describe('setOperationData()', () => {
    it('correctly sets request url', () => {
      requestMaker.setOperationData({
        method: 'post',
        path: '/todos',
        servers: [
          {
            url: 'https://todos.stoplight.io',
          },
        ],
      });

      expect(requestMaker.request.url).toEqual('https://todos.stoplight.io/todos');
    });

    it('correctly sets request query parameters', () => {
      requestMaker.setOperationData({
        request: {
          query: [
            {
              schema: {
                type: 'string',
                default: '300',
              },
              description: 'How many todos to limit?',
              name: 'limit',
              style: HttpParamStyles.Form,
            },
          ],
        },
      });

      expect(requestMaker.request.queryParams).toEqual([
        {
          name: 'limit',
          value: '300',
          isEnabled: true,
          schema: {
            type: 'string',
            default: '300',
          },
        },
      ]);
    });

    it('does not break when supplied with invalid data', () => {
      requestMaker.setOperationData({
        request: {
          query: [
            {
              schema: {
                type: 'number',
                default: 300,
              },
              description: 'How many todos to limit?',
              name: 'limit',
              style: HttpParamStyles.Form,
            },
          ],
        },
      });

      expect(requestMaker.request.queryParams).toHaveLength(1);
      expect(typeof requestMaker.request.queryParams[0].value).toBe('string');
    });
  });

  describe('setRequestData()', () => {
    it('correctly sets request data from request', () => {
      requestMaker.setRequestData({
        method: 'post',
        baseUrl: 'https://todos.stoplight.io',
        url: '/todos?apikey=123',
        headers: {
          'content-type': 'application/json',
        },
        body: {
          name: 'new todo',
          completed: false,
        },
      });

      expect(requestMaker.request.method).toEqual('post');
      expect(requestMaker.request.baseUrl).toEqual('https://todos.stoplight.io');
      expect(requestMaker.request.path).toEqual('/todos');
      expect(requestMaker.request.queryParams).toEqual([
        {
          name: 'apikey',
          value: '123',
          isEnabled: true,
        },
      ]);
      expect(requestMaker.request.headerParams).toEqual([
        {
          name: 'content-type',
          value: 'application/json',
          isEnabled: true,
        },
      ]);
      expect(requestMaker.request.contentType).toEqual('raw');
      expect(requestMaker.request.body).toEqual(
        safeStringify(
          {
            name: 'new todo',
            completed: false,
          },
          undefined,
          2,
        ),
      );
    });

    it('correctly handles query parameters with multiple values', () => {
      requestMaker.setRequestData({
        query: {
          someParam: ['a', 'b', 'c'],
        },
      });

      expect(requestMaker.request.queryParams).toEqual([
        { name: 'someParam', value: 'a' },
        { name: 'someParam', value: 'b' },
        { name: 'someParam', value: 'c' },
      ]);
    });
  });

  describe('send()', () => {
    let forwarderSpy: jest.SpyInstance;
    beforeEach(() => {
      forwarderSpy = jest.spyOn(axios, 'request');
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('sends the correct request data ', () => {
      requestMaker.setRequestData({
        method: 'post',
        url: 'https://todos.stoplight.io/todos?apikey=123',
        headers: {
          'content-type': 'application/json',
        },
        body: {
          name: 'new todo',
          completed: false,
        },
      });

      requestMaker.send();

      expect(forwarderSpy).toHaveBeenCalledWith({
        method: 'post',
        url: 'https://todos.stoplight.io/todos',
        params: {
          apikey: '123',
        },
        headers: {
          'content-type': 'application/json',
        },
        data: {
          name: 'new todo',
          completed: false,
        },
        responseType: 'arraybuffer',
        timeout: 10000,
        cancelToken: requestMaker.cancelToken!.token,
      });
    });

    it('sets the correct response data', async () => {
      forwarderSpy.mockResolvedValueOnce({
        status: 200,
        statusText: 'Success',
        headers: {
          responseHeader: 'responseHeaderValue',
        },
        data: stringToArrayBuffer(
          JSON.stringify({
            bodyTest: true,
          }),
        ),
      });

      await requestMaker.send();

      expect(requestMaker.response).toMatchObject({
        statusCode: 200,
        status: 'Success',
        headers: {
          responseHeader: 'responseHeaderValue',
        },
        error: undefined,
      });
      expect(requestMaker.response.bodyJson).toEqual({
        bodyTest: true,
      });
    });

    it('handles http errors', async () => {
      forwarderSpy = jest.spyOn(axios, 'request').mockRejectedValueOnce({
        response: {
          status: 404,
          headers: {},
          data: stringToArrayBuffer('Not Found'),
        },
      });

      await requestMaker.send();

      expect(requestMaker.response.statusCode).toBe(404);
      expect(requestMaker.response.error).toBeUndefined();
      expect(requestMaker.response.body).toBe('Not Found');
    });

    it('handles network errors', async () => {
      forwarderSpy = jest.spyOn(axios, 'request').mockRejectedValue({
        message: 'Network error',
      });

      await requestMaker.send();

      expect(requestMaker.response).toMatchObject({
        status: 'Error',
        statusCode: 0,
        headers: {},
        body: '',
      });
    });
  });

  describe('isMockEnabled', () => {
    it('should be false when no operation is set', () => {
      requestMaker.request.shouldMock = true;
      expect(requestMaker.isMockEnabled).toBe(false);
    });

    it('should be false when operation.method != request.method', () => {
      requestMaker.operation = {
        method: 'post',
        path: '/',
      };

      requestMaker.request.method = 'get';
      requestMaker.request.shouldMock = true;

      expect(requestMaker.isMockEnabled).toBe(false);
    });

    it('should be true when operation.method == request.method', () => {
      requestMaker.operation = {
        method: 'post',
        path: '/',
      };

      requestMaker.request.method = 'post';
      expect(requestMaker.isMockEnabled).toBe(false);
      requestMaker.request.shouldMock = true;
      expect(requestMaker.isMockEnabled).toBe(true);
    });
  });

  describe('reactions', () => {
    it('should disable mocking when operation.method != request.method', () => {
      requestMaker.operation = {
        method: 'post',
        path: '/',
      };
      requestMaker.request.method = 'post';
      requestMaker.request.shouldMock = true;

      expect(requestMaker.isMockEnabled).toBe(true);

      requestMaker.request.method = 'get';
      expect(requestMaker.isMockEnabled).toBe(false);
      expect(requestMaker.request.shouldMock).toBe(false);
    });
  });
});
