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
import { extractPrismPathFromRequestUrl } from '../index';

describe('RequestMakerStore', () => {
  let store: RequestMakerStore;

  beforeEach(() => {
    store = new RequestMakerStore();
  });

  describe('setOperationData()', () => {
    it('correctly sets request url', () => {
      store.setOperationData({
        method: 'post',
        path: '/todos',
        servers: [
          {
            url: 'https://todos.stoplight.io',
          },
        ],
      });

      expect(store.request.url).toEqual('https://todos.stoplight.io/todos');
    });

    it('correctly sets request query parameters', () => {
      store.setOperationData({
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

      expect(store.request.queryParams).toEqual([
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
      store.setOperationData({
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

      expect(store.request.queryParams).toHaveLength(1);
      expect(typeof store.request.queryParams[0].value).toBe('string');
    });
  });

  describe('setRequestData()', () => {
    it('correctly sets request data from request', () => {
      store.setRequestData({
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

      expect(store.request.method).toEqual('post');
      expect(store.request.baseUrl).toEqual('https://todos.stoplight.io');
      expect(store.request.templatedPath).toEqual('/todos');
      expect(store.request.queryParams).toEqual([
        {
          name: 'apikey',
          value: '123',
          isEnabled: true,
        },
      ]);
      expect(store.request.headerParams).toEqual([
        {
          name: 'content-type',
          value: 'application/json',
          isEnabled: true,
        },
      ]);
      expect(store.request.contentType).toEqual('raw');
      expect(store.request.body).toEqual(
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
      store.setRequestData({
        query: {
          someParam: ['a', 'b', 'c'],
        },
      });

      expect(store.request.queryParams).toEqual([
        { name: 'someParam', value: 'a', isEnabled: true },
        { name: 'someParam', value: 'b', isEnabled: true },
        { name: 'someParam', value: 'c', isEnabled: true },
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
      store.setRequestData({
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

      store.send();

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
        cancelToken: store.cancelToken!.token,
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

      await store.send();

      expect(store.response).toMatchObject({
        statusCode: 200,
        status: 'Completed',
        headers: {
          responseHeader: 'responseHeaderValue',
        },
        error: undefined,
      });
      expect(store.response.bodyJson).toEqual({
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

      await store.send();

      expect(store.response.statusCode).toBe(404);
      expect(store.response.error).toBeUndefined();
      expect(store.response.body).toBe('Not Found');
    });

    it('handles network errors', async () => {
      forwarderSpy = jest.spyOn(axios, 'request').mockRejectedValue({
        message: 'Network error',
      });

      await store.send();

      expect(store.response).toMatchObject({
        status: 'Error',
        statusCode: 0,
        headers: {},
        body: '',
      });
    });
  });

  describe('isMockEnabled', () => {
    it('should be false when no operation is set', () => {
      store.request.shouldMock = true;
      expect(store.isMockEnabled).toBe(false);
    });

    it('should be false when operation.method != request.method', () => {
      store.operation = {
        method: 'post',
        path: '/',
      };

      store.request.method = 'get';
      store.request.shouldMock = true;

      expect(store.isMockEnabled).toBe(false);
    });

    it('should be true when operation.method == request.method', () => {
      store.operation = {
        method: 'post',
        path: '/',
      };

      store.request.method = 'post';
      expect(store.isMockEnabled).toBe(false);
      store.request.shouldMock = true;
      expect(store.isMockEnabled).toBe(true);
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
      expect(store.prismConfig).toEqual(defaultPrismConfig);
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
      store.request.headerParams = [
        {
          name: 'Prefer',
          value: headerValue,
          isEnabled: true,
        },
      ];

      expect(store.prismConfig).toEqual(expectedConfig);
    });

    it('should ignore disabled Prefer header', () => {
      store.request.headerParams = [
        {
          name: 'Prefer',
          value: 'dynamic="true"',
        },
      ];

      expect(store.prismConfig).toEqual(defaultPrismConfig);
    });

    it('should parse a combination of Prefer headers', () => {
      store.request.headerParams = [
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

      expect(store.prismConfig).toEqual({
        ...defaultPrismConfig,
        validateRequest: false,
        validateResponse: false,
      });
    });
  });

  describe('setPrismConfigurationOption', () => {
    const cases = ['checkSecurity', 'validateRequest', 'validateResponse', 'errors'] as const;

    it.each(cases)('should correctly toggle %p', key => {
      const originalConfiguration = store.prismConfig;
      const originalValue = store.prismConfig[key];

      store.setPrismConfigurationOption(key, !originalValue);

      expect(store.prismConfig).not.toBe(originalConfiguration);
      expect(store.prismConfig[key]).toEqual(!originalValue);
      for (const otherKey of without(cases, key)) {
        expect(store.prismConfig[otherKey]).toEqual(originalConfiguration[otherKey]);
      }
    });

    it('should add a Prefer header if there are none', () => {
      store.request.headerParams = [];

      store.setPrismConfigurationOption('validateRequest', false);

      const header = store.request.headerParams.find(h => h.name === 'Prefer');
      expect(header).toBeDefined();
      expect(header?.isEnabled).toBe(true);
      const parsed = parsePreferHeader(header?.value);
      expect(parsed.validateRequest).toBe('false');
    });

    it('should add a Prefer header if all of them are disabled', () => {
      store.request.headerParams = [
        {
          name: 'Prefer',
          value: 'some-value',
          isEnabled: false,
        },
      ];

      store.setPrismConfigurationOption('validateRequest', false);

      expect(store.request.headerParams).toHaveLength(2);
      const header = store.request.headerParams[1];
      expect(header.name).toBe('Prefer');
      expect(header.isEnabled).toBe(true);
    });

    it('should modify the value of the active Prefer header', () => {
      store.request.headerParams = [
        {
          name: 'Prefer',
          value: 'validate-request=true',
          isEnabled: true,
        },
      ];

      store.setPrismConfigurationOption('validateRequest', false);

      expect(store.request.headerParams).toHaveLength(1);
      const header = store.request.headerParams[0];
      expect(header.name).toBe('Prefer');
      expect(header.isEnabled).toBe(true);
      expect(header.value).toBe('validate-request=false');
    });

    it('should keep unrelated values untouched when changing active Prefer header', () => {
      store.request.headerParams = [
        {
          name: 'Prefer',
          value: 'validate-request=false, unrelated-value',
          isEnabled: true,
        },
      ];

      store.setPrismConfigurationOption('validateResponse', false);

      expect(store.request.headerParams).toHaveLength(1);
      const header = store.request.headerParams[0];
      expect(header.name).toBe('Prefer');
      expect(header.isEnabled).toBe(true);
      expect(parsePreferHeader(header.value)).toEqual({
        validateRequest: 'false',
        unrelatedValue: true,
        validateResponse: 'false',
      });
    });

    it('should remove prefer header when setting value to default', () => {
      store.request.headerParams = [
        {
          name: 'Prefer',
          value: 'validate-request=false',
          isEnabled: true,
        },
      ];

      store.setPrismConfigurationOption('validateRequest', true);

      expect(store.request.headerParams).toHaveLength(0);
    });

    it('should remove prism option from prefer header when setting value to default', () => {
      store.request.headerParams = [
        {
          name: 'Prefer',
          value: 'validate-request=false, unrelated-value',
          isEnabled: true,
        },
      ];

      store.setPrismConfigurationOption('validateRequest', true);

      expect(store.request.headerParams).toHaveLength(1);
      expect(store.request.headerParams[0]).toMatchObject({
        name: 'Prefer',
        value: 'unrelated-value',
        isEnabled: true,
      });
    });
  });

  describe('reactions', () => {
    it('should disable mocking when operation.method != request.method', () => {
      store.operation = {
        method: 'post',
        path: '/',
      };
      store.request.method = 'post';
      store.request.shouldMock = true;

      expect(store.isMockEnabled).toBe(true);

      store.request.method = 'get';
      expect(store.isMockEnabled).toBe(false);
      expect(store.request.shouldMock).toBe(false);
    });
  });

  describe('Integration - empty response operation', () => {
    it('should be mocked correctly', async () => {
      store.setOperationData(emptyResponseOperation);
      store.request.templatedPath = '/dummy';
      await store.mock();
      expect(store.response.status).toBe('Completed');
      expect(store.response.raw).toEqual(new Uint8Array(0));
    });
  });

  describe('extractPrismPathFromRequestUrl', () => {
    describe('base url with no path', () => {
      const baseUrl = 'https://httpbin.org/';
      const url = 'https://httpbin.org/operation';

      const prismUrl = extractPrismPathFromRequestUrl(url, baseUrl);

      it('should keep the url as it is', () => expect(prismUrl).toBe('/operation'));
    });

    describe('base url not ending with / and with no path', () => {
      const baseUrl = 'https://httpbin.org';
      const url = 'https://httpbin.org/operation';

      const prismUrl = extractPrismPathFromRequestUrl(url, baseUrl);

      it('should keep the url as it is', () => expect(prismUrl).toBe('/operation'));
    });

    describe('base url with base path', () => {
      const baseUrl = 'https://httpbin.org/v2/operation';
      const url = '/operation';

      const prismUrl = extractPrismPathFromRequestUrl(url, baseUrl);

      it('should keep the url as it is', () => expect(prismUrl).toBe('/operation'));
    });

    describe('base url with long base path', () => {
      const baseUrl = 'https://httpbin.org/p/mocks/10/40/operation';
      const url = '/operation';

      const prismUrl = extractPrismPathFromRequestUrl(url, baseUrl);

      it('should keep the url as it is', () => expect(prismUrl).toBe('/operation'));
    });
  });
});
