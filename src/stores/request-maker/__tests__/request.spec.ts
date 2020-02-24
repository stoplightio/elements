import { RequestStore } from '../request';

describe('RequestStore', () => {
  let requestStore: RequestStore;

  beforeEach(() => {
    requestStore = new RequestStore();
  });

  describe('baseUrl', () => {
    it('should set the request store baseUrl value', () => {
      requestStore.publicBaseUrl = 'https://test.com';

      expect(requestStore.baseUrl).toEqual('https://test.com');
    });

    it('should set the request store path value to empty', () => {
      requestStore.publicBaseUrl = 'https://test.com/path';

      expect(requestStore.templatedPath).toEqual('');
    });

    it('should keep the base path in the baseUrl property', () => {
      requestStore.templatedPath = '/param';
      requestStore.publicBaseUrl = 'https://test.com/path';

      expect(requestStore.templatedPath).toEqual('/param');
    });

    it('should not duplicate the path value if it already exists on the request store path', () => {
      requestStore.templatedPath = '/v1/path';
      requestStore.publicBaseUrl = 'https://test.com/v1';

      expect(requestStore.templatedPath).toEqual('/v1/path');
    });

    it('should ignore duplicate trailing slashes', () => {
      requestStore.templatedPath = '/';
      requestStore.publicBaseUrl = 'https://test.com//';

      expect(requestStore.templatedPath).toEqual('/');
    });
  });

  describe('url - get', () => {
    it('should respect base URL and path', () => {
      requestStore.publicBaseUrl = 'https://test.com';
      requestStore.templatedPath = '/asd';

      expect(requestStore.url).toBe('https://test.com/asd');
    });

    it('should respect folder in baseUrl', () => {
      requestStore.publicBaseUrl = 'https://test.com/v2/';
      requestStore.templatedPath = '/asd';

      expect(requestStore.url).toBe('https://test.com/v2/asd');
    });

    it('should begin with a slash if there is no baseUrl specified', () => {
      requestStore.templatedPath = '/pet/2';

      expect(requestStore.url).toBe('/pet/2');
    });

    it('should combine path with enabled query params', () => {
      Object.assign<RequestStore, Partial<RequestStore>>(requestStore, {
        method: 'post',
        publicBaseUrl: 'https://test.com',
        templatedPath: '/test',
        queryParams: [
          {
            name: 'paramName',
            value: 'paramValue',
            isEnabled: true,
          },
          {
            name: 'disabledParamName',
            value: 'disabledParamValue',
            isEnabled: false,
          },
          {
            schema: {
              type: 'string',
              enum: ['one', 'two', 'three'],
            },
            value: undefined,
            name: 'anotherParam',
            isEnabled: true,
          },
          {
            value: undefined,
            schema: {
              type: 'boolean',
              description: 'True or false?',
            },
            name: 'booleanParam',
          },
        ],
      });

      expect(requestStore.url).toBe('https://test.com/test?paramName=paramValue&anotherParam');
    });

    it('should resolve path params', () => {
      requestStore.templatedPath = '/pet/{petId}';
      requestStore.pathParams = [
        {
          name: 'petId',
          value: '42',
          isEnabled: true,
        },
      ];

      expect(requestStore.url).toBe('/pet/42');
    });
  });

  describe('url - set', () => {
    it('should set the request store baseUrl value', () => {
      requestStore.url = 'https://test.com';

      expect(requestStore.baseUrl).toEqual('https://test.com');
    });

    it('should set the request store path value', () => {
      requestStore.url = 'https://test.com/path';

      expect(requestStore.templatedPath).toEqual('/path');
    });

    it('should set the request store query parameters', () => {
      requestStore.url = 'https://test.com/path?query=value';

      expect(requestStore.queryParams).toEqual([
        {
          name: 'query',
          value: 'value',
          isEnabled: true,
        },
      ]);
    });

    it('should set the request store path parameters', () => {
      requestStore.url = 'https://test.com/path/{param}?query=value';

      expect(requestStore.pathParams).toEqual([
        {
          name: 'param',
          value: '',
          isEnabled: true,
        },
      ]);
    });
  });

  describe('setQueryParamsFromString', () => {
    it('should extract query params', () => {
      requestStore.setQueryParamsFromString('?paramName=differentParamValue&anotherParam=someValue');

      expect(requestStore.queryParams).toEqual([
        {
          name: 'paramName',
          value: 'differentParamValue',
          isEnabled: true,
        },
        {
          name: 'anotherParam',
          value: 'someValue',
          isEnabled: true,
        },
      ]);
    });

    it('should preserve optional query params', () => {
      Object.assign(requestStore, {
        method: 'post',
        publicBaseUrl: 'https://test.com',
        path: '/test',
        queryParams: [
          {
            name: 'paramName',
            value: 'paramValue',
            isEnabled: true,
          },
          {
            name: 'disabledParamName',
            value: 'disabledParamValue',
            isEnabled: false,
          },
          {
            schema: {
              type: 'string',
              enum: ['one', 'two', 'three'],
            },
            name: 'anotherParam',
            isEnabled: true,
          },
          {
            schema: {
              type: 'boolean',
              description: 'True or false?',
            },
            name: 'booleanParam',
          },
        ],
      });

      requestStore.setQueryParamsFromString('testParam=testValue&anotherTestParam=');
      expect(requestStore.queryParams).toEqual([
        {
          name: 'testParam',
          value: 'testValue',
          isEnabled: true,
        },
        {
          name: 'disabledParamName',
          value: 'disabledParamValue',
          isEnabled: false,
        },
        {
          name: 'anotherTestParam',
          value: '',
          isEnabled: true,
        },
        {
          schema: {
            type: 'boolean',
            description: 'True or false?',
          },
          name: 'booleanParam',
        },
      ]);
    });

    it('should preserve query param order', () => {
      requestStore.queryParams = [
        {
          name: 'paramName',
          value: 'paramValue',
          isEnabled: true,
        },
        {
          name: 'disabledParamName',
          value: 'disabledParamValue',
          isEnabled: false,
        },
        {
          schema: {
            type: 'string',
            enum: ['one', 'two', 'three'],
          },
          value: undefined,
          name: 'anotherParam',
          isEnabled: true,
        },
        {
          schema: {
            type: 'boolean',
            description: 'True or false?',
          },
          value: undefined,
          isEnabled: false,
          name: 'booleanParam',
        },
      ];

      requestStore.setQueryParamsFromString('?paramName=differentParamValue&anotherParam=someValue');

      expect(requestStore.queryParams).toEqual([
        {
          name: 'paramName',
          value: 'differentParamValue',
          isEnabled: true,
        },
        {
          name: 'disabledParamName',
          value: 'disabledParamValue',
          isEnabled: false,
        },
        {
          schema: {
            type: 'string',
            enum: ['one', 'two', 'three'],
          },
          name: 'anotherParam',
          value: 'someValue',
          isEnabled: true,
        },
        {
          schema: {
            type: 'boolean',
            description: 'True or false?',
          },
          name: 'booleanParam',
          value: undefined,
          isEnabled: false,
        },
      ]);
    });
  });

  describe('path', () => {
    it('should extract path params from path', () => {
      requestStore.templatedPath = '/{pathParam}/{anotherParam}/{space param}';

      expect(requestStore.pathParams).toEqual([
        {
          name: 'pathParam',
          value: '',
          isEnabled: true,
        },
        {
          name: 'anotherParam',
          value: '',
          isEnabled: true,
        },
        {
          name: 'space param',
          value: '',
          isEnabled: true,
        },
      ]);
    });

    it('should extract path params from path and overwrite existing path params', () => {
      requestStore.pathParams = [
        {
          name: 'pathParam',
          value: 'pathParamValue',
          isEnabled: true,
        },
        {
          name: 'enabledParam',
          value: 'enabledParamValue',
          isEnabled: true,
        },
        {
          name: 'anotherParam',
          value: 'testValue',
          isEnabled: false,
        },
      ];

      requestStore.templatedPath = '/test/{pathPar}/{anotherPar}';

      expect(requestStore.pathParams).toEqual([
        {
          isEnabled: true,
          name: 'pathPar',
          value: '',
        },
        {
          isEnabled: true,
          name: 'anotherPar',
          value: '',
        },
      ]);
    });
  });

  describe('pathParams', () => {
    it('should add path params to the path', () => {
      requestStore.pathParams = [
        {
          name: 'pathParam',
          value: 'value',
          isEnabled: true,
        },
        {
          name: '',
          value: '',
          isEnabled: true,
        },
        {
          name: 'anotherParam',
          value: 'testValue',
          isEnabled: false,
        },
        {
          name: 'with a space',
          value: 'testValue',
          isEnabled: false,
        },
        {
          name: 'hash#Param',
          value: 'testValue',
          isEnabled: false,
        },
        {
          name: 'questionMark?Param',
          value: 'testValue',
          isEnabled: false,
        },
      ];

      expect(requestStore.templatedPath).toEqual('/{pathParam}/{anotherParam}/{with a space}/{hashParam}/{questionMarkParam}');
    });
  });

  describe('setParam', () => {
    it('should update existing param', () => {
      requestStore.queryParams = [
        {
          name: 'queryParam',
          value: 'value',
        },
        {
          name: 'anotherParam',
          value: 'testValue',
        },
      ];

      requestStore.setParam('query', 'anotherParam', 'value', 'testValue2');

      expect(requestStore.queryParams).toEqual([
        {
          name: 'queryParam',
          value: 'value',
        },
        {
          name: 'anotherParam',
          value: 'testValue2',
        },
      ]);
    });
  });

  describe('toPrism()', () => {
    it('should build correct prism request', () => {
      requestStore.method = 'post';
      requestStore.url = 'https://test.com/test?paramName=paramValue&anotherParam';
      requestStore.headers = {
        headerName: 'headerValue',
        'Content-Type': 'application/json',
      };
      requestStore.auth = {
        username: 'user',
        password: 'password',
      };
      requestStore.body = '{"some": "json"}';

      expect(requestStore.toPrism()).toEqual({
        url: {
          baseUrl: 'https://test.com',
          path: '/test',
          query: {
            paramName: 'paramValue',
            anotherParam: null,
          },
        },
        method: 'post',
        body: { some: 'json' },
        headers: {
          headerName: 'headerValue',
          'Content-Type': 'application/json',
          authorization: `Basic ${Buffer.from('user:password').toString('base64')}`,
        },
      });
    });

    it('keeps the body as a string if no Content-Type header set', () => {
      requestStore.method = 'post';
      requestStore.headers = {
        headerName: 'headerValue',
      };
      requestStore.body = '{"some": "json"}';

      expect(requestStore.toPrism().body).toBe('{"some": "json"}');
    });
  });

  describe('toAxios()', () => {
    it('should build correct request with auth', () => {
      requestStore.method = 'post';
      requestStore.url = 'https://test.com/test?paramName=paramValue&anotherParam';
      requestStore.headers = {
        headerName: 'headerValue',
      };
      requestStore.auth = {
        username: 'user',
        password: 'password',
      };

      expect(requestStore.toAxios()).toEqual({
        url: 'https://test.com/test',
        params: {
          paramName: 'paramValue',
          anotherParam: null,
        },
        method: 'post',
        data: undefined,
        headers: {
          headerName: 'headerValue',
        },
        auth: {
          username: 'user',
          password: 'password',
        },
      });
    });
  });

  describe('toHAR()', () => {
    it('should return x-www-form-urlencoded for form-data', () => {
      requestStore.method = 'post';
      requestStore.url = 'http://mockbin.com/har';
      requestStore.headers = {
        'content-type': 'multipart/form-data',
      };
      requestStore.body = {
        foo: 'bar',
      };

      expect(requestStore.toHAR()).toEqual({
        method: 'POST',
        url: 'http://mockbin.com/har',
        headers: [
          {
            name: 'content-type',
            value: 'multipart/form-data',
          },
        ],
        postData: {
          mimeType: 'application/x-www-form-urlencoded',
          params: [
            {
              name: 'foo',
              value: 'bar',
            },
          ],
        },
      });
    });

    it('should return x-www-form-urlencoded for url encoded body', () => {
      requestStore.method = 'post';
      requestStore.url = 'http://mockbin.com/har';
      requestStore.headers = {
        'content-type': 'application/x-www-form-urlencoded',
      };
      requestStore.body = {
        foo: 'bar',
      };

      expect(requestStore.toHAR()).toEqual({
        method: 'POST',
        url: 'http://mockbin.com/har',
        headers: [
          {
            name: 'content-type',
            value: 'application/x-www-form-urlencoded',
          },
        ],
        postData: {
          mimeType: 'application/x-www-form-urlencoded',
          params: [
            {
              name: 'foo',
              value: 'bar',
            },
          ],
        },
      });
    });

    it('should return application/json for raw body', () => {
      requestStore.method = 'post';
      requestStore.url = 'http://mockbin.com/har';
      requestStore.headers = {
        'content-type': 'application/json',
      };
      requestStore.body = {
        foo: 'bar',
      };

      expect(requestStore.toHAR()).toEqual({
        method: 'POST',
        url: 'http://mockbin.com/har',
        headers: [
          {
            name: 'content-type',
            value: 'application/json',
          },
        ],
        postData: {
          mimeType: 'application/json',
          text: '{"foo":"bar"}',
        },
      });
    });

    it('should return application/json for graphql body', () => {
      requestStore.method = 'post';
      requestStore.url = 'http://mockbin.com/har';
      requestStore.headers = {
        'content-type': 'application/json',
      };
      requestStore.contentType = 'graphql';
      requestStore.body = `{
        hero {
          name
        }
      }`;
      requestStore.graphqlVariables = 'episode: $episode';

      expect(requestStore.toHAR()).toEqual({
        method: 'POST',
        url: 'http://mockbin.com/har',
        headers: [
          {
            name: 'content-type',
            value: 'application/json',
          },
        ],
        postData: {
          mimeType: 'application/json',
          text: '{"query":"{\\n        hero {\\n          name\\n        }\\n      }","variables":"episode: $episode"}',
        },
      });
    });

    it('should return multipart/form-data for binary body', () => {
      requestStore.method = 'post';
      requestStore.url = 'http://mockbin.com/har';
      requestStore.headers = {
        'content-type': 'multipart/form-data',
      };
      requestStore.contentType = 'binary';
      requestStore.formDataParams = [
        {
          name: 'test/fixtures/files/hello.txt',
          value: 'BLOB',
          type: 'text/plain',
          isEnabled: true,
        },
        {
          name: 'test/fixtures/files/image.jpg',
          value: 'BLOB',
          type: 'image/jpeg',
          isEnabled: true,
        },
      ];

      expect(requestStore.toHAR()).toEqual({
        method: 'POST',
        url: 'http://mockbin.com/har',
        headers: [
          {
            name: 'content-type',
            value: 'multipart/form-data',
          },
        ],
        postData: {
          mimeType: 'multipart/form-data',
          params: [
            {
              name: 'test/fixtures/files/hello.txt',
              fileName: 'test/fixtures/files/hello.txt',
              value: 'BLOB',
              contentType: 'text/plain',
            },
            {
              name: 'test/fixtures/files/image.jpg',
              fileName: 'test/fixtures/files/image.jpg',
              value: 'BLOB',
              contentType: 'image/jpeg',
            },
          ],
        },
      });
    });
  });

  describe('toJSON()', () => {
    it('should not return empty properties', () => {
      requestStore.url = 'http://mockbin.com/har';
      requestStore.headers = {};
      requestStore.query = {};
      requestStore.body = '';

      expect(requestStore.toJSON()).toEqual({
        url: 'http://mockbin.com/har',
        method: 'get',
      });
    });

    it('should return the correct server url', () => {
      requestStore.url = 'http://mockbin.com/har';
      requestStore.publicBaseUrl = 'https://test.com';

      expect(requestStore.toJSON()).toEqual({
        method: 'get',
        url: 'https://test.com/har',
      });
    });

    it('should return query params in the correct order', () => {
      requestStore.url = 'http://mockbin.com/har';
      requestStore.query = {
        testQueryParam2: 'testQueryValue2',
        testQueryParam1: 'testQueryValue1',
      };

      expect(requestStore.toJSON()).toEqual({
        method: 'get',
        url: 'http://mockbin.com/har',
        query: {
          testQueryParam2: 'testQueryValue2',
          testQueryParam1: 'testQueryValue1',
        },
      });
    });

    it('should return the correct body for raw content', () => {
      requestStore.method = 'post';
      requestStore.url = 'http://mockbin.com/har';
      requestStore.headers = {
        'content-type': 'application/json',
      };
      requestStore.body = {
        foo: 'bar',
      };

      expect(requestStore.toJSON()).toEqual({
        method: 'post',
        url: 'http://mockbin.com/har',
        headers: {
          'content-type': 'application/json',
        },
        body: {
          foo: 'bar',
        },
      });
    });

    it('should return the correct body for graphql content', () => {
      requestStore.method = 'post';
      requestStore.url = 'http://mockbin.com/har';
      requestStore.headers = {
        'content-type': 'application/json',
      };
      requestStore.contentType = 'graphql';
      requestStore.graphqlQuery = `query(test: $test) { id }`;
      requestStore.graphqlVariables = `{ test: "foo" }`;

      expect(requestStore.toJSON()).toEqual({
        method: 'post',
        url: 'http://mockbin.com/har',
        headers: {
          'content-type': 'application/json',
        },
        body: {
          query: `query(test: $test) { id }`,
          variables: `{ test: "foo" }`,
        },
      });
    });

    it('should return the correct body for form-data content', () => {
      requestStore.method = 'post';
      requestStore.url = 'http://mockbin.com/har';
      requestStore.headers = {
        'content-type': 'multipart/form-data',
      };
      requestStore.body = {
        foo: 'bar',
      };

      expect(requestStore.toJSON()).toEqual({
        method: 'post',
        url: 'http://mockbin.com/har',
        headers: {
          'content-type': 'multipart/form-data',
        },
        body: {
          foo: 'bar',
        },
      });
    });

    it('should return the correct body for binary content', () => {
      requestStore.method = 'post';
      requestStore.url = 'http://mockbin.com/har';
      requestStore.headers = {
        'content-type': 'multipart/form-data',
      };
      requestStore.contentType = 'binary';
      requestStore.body = {
        foo: 'bar',
      };

      expect(requestStore.toJSON()).toEqual({
        method: 'post',
        url: 'http://mockbin.com/har',
        headers: {
          'content-type': 'multipart/form-data',
        },
        body: {
          foo: 'bar',
        },
      });
    });
  });

  describe('generateCode()', () => {
    it('should return correct snippet for shell - curl', () => {
      requestStore.method = 'post';
      requestStore.url = 'https://test.com/test?queryName=queryValue';
      requestStore.headers = {
        'content-type': 'application/json',
      };
      requestStore.body = {
        foo: 'bar',
      };

      expect(requestStore.generateCode('shell', 'curl')).toBe(
        `curl --request POST \\` +
          `\n  --url 'https://test.com/test?queryName=queryValue' \\` +
          `\n  --header 'content-type: application/json' \\` +
          `\n  --data '{"foo":"bar"}'`,
      );
    });

    it('should return correct snippet for markdown - json', () => {
      requestStore.method = 'post';
      requestStore.url = 'https://test.com/test?queryName=queryValue';
      requestStore.headers = {
        'content-type': 'application/json',
      };
      requestStore.body = {
        foo: 'bar',
      };

      expect(requestStore.generateCode('markdown')).toBe(
        '```json http\n' +
          `{
  "method": "post",
  "url": "https://test.com/test",
  "query": {
    "queryName": "queryValue"
  },
  "headers": {
    "content-type": "application/json"
  },
  "body": {
    "foo": "bar"
  }
}` +
          '\n```',
      );
    });

    it('should return correct snippet for markdown - yaml', () => {
      requestStore.method = 'post';
      requestStore.url = 'https://test.com/test?queryName=queryValue';
      requestStore.headers = {
        'content-type': 'application/json',
      };
      requestStore.body = {
        foo: 'bar',
      };

      expect(requestStore.generateCode('markdown', 'yaml')).toBe(
        `\`\`\`yaml http
method: post
url: 'https://test.com/test'
query:
  queryName: queryValue
headers:
  content-type: application/json
body:
  foo: bar

\`\`\``,
      );
    });

    it('should return correct snippet for har', () => {
      requestStore.method = 'post';
      requestStore.url = 'https://test.com/test?queryName=queryValue';
      requestStore.headers = {
        'content-type': 'application/json',
      };
      requestStore.body = {
        foo: 'bar',
      };

      expect(requestStore.generateCode('har')).toBe(
        `{
  "method": "POST",
  "url": "https://test.com/test?queryName=queryValue",
  "headers": [
    {
      "name": "content-type",
      "value": "application/json"
    }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\\"foo\\":\\"bar\\"}"
  }
}`,
      );
    });
  });
});
