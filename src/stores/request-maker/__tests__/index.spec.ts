import { safeStringify } from '@stoplight/json';
import { IHttpConfig } from '@stoplight/prism-http';
import { HttpParamStyles } from '@stoplight/types';
import axios from 'axios';
import 'jest-enzyme';
import { without } from 'lodash';
import parsePreferHeader from 'parse-prefer-header';
import { RequestMakerStore } from '..';
import { operation as emptyResponseOperation } from '../../../__fixtures__/operations/empty-response';
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
        status: 'Completed',
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

  describe('prismConfiguration', () => {
    const defaultPrismConfig = {
      mock: { dynamic: false },
      checkSecurity: true,
      validateRequest: true,
      validateResponse: true,
      errors: false,
    };

    it('has the same defaults as prism itself', () => {
      expect(requestMaker.prismConfig).toEqual(defaultPrismConfig);
    });

    // test cases: headerValue-expectedConfig
    const cases: Array<[string, IHttpConfig]> = [
      ['', defaultPrismConfig],
      ['some-unrelated=stuff', defaultPrismConfig],
      [
        'unrelated-code=201, dynamic=true',
        {
          ...defaultPrismConfig,
          mock: {
            dynamic: true,
          },
        },
      ],
      [
        'dynamic="true"',
        {
          ...defaultPrismConfig,
          mock: {
            dynamic: true,
          },
        },
      ],
      [
        'code=201, example=named_example, dynamic=true',
        {
          ...defaultPrismConfig,
          mock: {
            code: '201',
            exampleKey: 'named_example',
            dynamic: true,
          },
        },
      ],
      [
        'dynamic="true",validate-request=false,validate-response=false,code="201", check-security=false',
        {
          ...defaultPrismConfig,
          validateRequest: false,
          validateResponse: false,
          mock: {
            dynamic: true,
            code: '201',
          },
          checkSecurity: false,
        },
      ],
    ];

    it.each(cases)('should parse Prefer header %p', (headerValue, expectedConfig) => {
      requestMaker.request.headerParams.push({
        name: 'Prefer',
        value: headerValue,
        isEnabled: true,
      });

      expect(requestMaker.prismConfig).toEqual(expectedConfig);
    });

    it('should ignore disabled Prefer header', () => {
      requestMaker.request.headerParams.push({
        name: 'Prefer',
        value: 'dynamic="true"',
      });

      expect(requestMaker.prismConfig).toEqual(defaultPrismConfig);
    });

    it('should parse a combination of Prefer headers', () => {
      requestMaker.request.headerParams = [
        {
          name: 'Prefer',
          value: 'validate-request=false',
          isEnabled: true,
        },
        {
          name: 'Prefer',
          value: 'check-security=false',
        },
        {
          name: 'Prefer',
          value: 'validate-response=false',
          isEnabled: true,
        },
      ];

      expect(requestMaker.prismConfig).toEqual({
        ...defaultPrismConfig,
        validateRequest: false,
        validateResponse: false,
      });
    });
  });

  describe('setPrismConfigurationOption', () => {
    const cases = ['checkSecurity', 'validateRequest', 'validateResponse', 'errors'] as const;

    it.each(cases)('should correctly toggle %p', key => {
      const originalConfiguration = requestMaker.prismConfig;
      const originalValue = requestMaker.prismConfig[key];

      requestMaker.setPrismConfigurationOption(key, !originalValue);

      expect(requestMaker.prismConfig).not.toBe(originalConfiguration);
      expect(requestMaker.prismConfig[key]).toEqual(!originalValue);
      for (const otherKey of without(cases, key)) {
        expect(requestMaker.prismConfig[otherKey]).toBe(originalConfiguration[otherKey]);
      }
    });

    it('should add a Prefer header if there are none', () => {
      requestMaker.setPrismConfigurationOption('validateRequest', false);

      const header = requestMaker.request.headerParams.find(h => h.name === 'Prefer');
      expect(header?.isEnabled).toBe(true);
      const parsed = parsePreferHeader(header?.value || '');
      expect(parsed.validateRequest).toBe('false');
    });

    it('should add a Prefer header if all of them are disabled', () => {
      requestMaker.request.headerParams.push({
        name: 'Prefer',
        value: 'some-value',
        isEnabled: false,
      });
      requestMaker.setPrismConfigurationOption('validateRequest', false);

      expect(requestMaker.request.headerParams).toHaveLength(2);
      const header = requestMaker.request.headerParams[1];
      expect(header.name).toBe('Prefer');
      expect(header.isEnabled).toBe(true);
    });

    it('should change active Prefer header', () => {
      requestMaker.request.headerParams.push({
        name: 'Prefer',
        value: 'validate-request=true',
        isEnabled: true,
      });
      requestMaker.setPrismConfigurationOption('validateRequest', false);

      expect(requestMaker.request.headerParams).toHaveLength(1);
      const header = requestMaker.request.headerParams[0];
      expect(header.name).toBe('Prefer');
      expect(header.isEnabled).toBe(true);
      expect(header.value).toBe('validate-request=false');
    });

    it('should keep unrelated values untouched when changing active Prefer header', () => {
      requestMaker.request.headerParams.push({
        name: 'Prefer',
        value: 'validate-request=false, unrelated-value',
        isEnabled: true,
      });
      requestMaker.setPrismConfigurationOption('validateResponse', false);

      expect(requestMaker.request.headerParams).toHaveLength(1);
      const header = requestMaker.request.headerParams[0];
      expect(header.name).toBe('Prefer');
      expect(header.isEnabled).toBe(true);
      expect(parsePreferHeader(header.value || '')).toEqual({
        validateRequest: 'false',
        unrelatedValue: true,
        validateResponse: 'false',
      });
    });

    it('should remove prefer header when setting value to default', () => {
      requestMaker.request.headerParams.push({
        name: 'Prefer',
        value: 'validate-request=false',
        isEnabled: true,
      });
      requestMaker.setPrismConfigurationOption('validateRequest', true);

      expect(requestMaker.request.headerParams).toHaveLength(0);
    });

    it('should remove prism option from prefer header when setting value to default', () => {
      requestMaker.request.headerParams.push({
        name: 'Prefer',
        value: 'validate-request=false, unrelated-value',
        isEnabled: true,
      });
      requestMaker.setPrismConfigurationOption('validateRequest', true);

      expect(requestMaker.request.headerParams).toHaveLength(1);
      expect(requestMaker.request.headerParams[0]).toMatchObject({
        name: 'Prefer',
        value: 'unrelated-value',
        isEnabled: true
      });
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

  describe('Integration - empty response operation', () => {
    it('should be mocked correctly', async () => {
      requestMaker.setOperationData(emptyResponseOperation);
      requestMaker.request.path = '/dummy';
      await requestMaker.mock();
      expect(requestMaker.response.status).toBe('Completed');
      expect(requestMaker.response.raw).toEqual(new Uint8Array(0));
    });
  });
});
