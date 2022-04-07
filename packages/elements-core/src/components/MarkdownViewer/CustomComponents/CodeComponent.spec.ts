import { HttpParamStyles, IHttpRequest } from '@stoplight/types';

import { parseHttpRequest } from './CodeComponent';

describe('parseHttpRequest', () => {
  it('parses HttpRequest with relative url', () => {
    const request: IHttpRequest = {
      id: '?http-request?',
      method: 'get',
      url: '/todos',
      baseUrl: 'http://test',
      query: {},
      headers: {},
    };

    const httpOperation = parseHttpRequest(request);

    expect(httpOperation).toEqual({
      id: '?http-operation-id?',
      method: 'get',
      path: '/todos',
      servers: [{ id: '?http-server-/todos?', url: 'http://test' }],
      request: {
        headers: [],
        query: [],
      },
      responses: [],
    });
  });

  it('parses HttpRequest with absolute url', () => {
    const request: IHttpRequest = {
      id: '?http-request?',
      method: 'get',
      url: 'http://test/todos',
      baseUrl: '',
      query: {},
      headers: {},
    };

    const httpOperation = parseHttpRequest(request);

    expect(httpOperation).toEqual({
      id: '?http-operation-id?',
      method: 'get',
      path: '/todos',
      servers: [{ id: '?http-server-http://test/todos?', url: 'http://test' }],
      request: {
        headers: [],
        query: [],
      },
      responses: [],
    });
  });

  it('parses HttpRequest parameters', () => {
    const request: IHttpRequest = {
      id: '?http-request?',
      method: 'post',
      url: '/todos/{id}',
      baseUrl: 'http://test',
      query: {
        limit: ['10'],
        skip: [],
      },
      headers: {
        apikey: '123',
      },
      body: '{}',
    };

    const httpOperation = parseHttpRequest(request);

    expect(httpOperation).toMatchObject({
      id: '?http-operation-id?',
      method: 'post',
      path: '/todos/{id}',
      servers: [{ url: 'http://test' }],
      request: {
        query: [
          { name: 'limit', style: HttpParamStyles.Form, schema: { default: '10' }, required: true },
          { name: 'skip', style: HttpParamStyles.Form, schema: {}, required: false },
        ],
        headers: [{ name: 'apikey', style: HttpParamStyles.Simple, schema: { default: '123' }, required: true }],
        path: [{ name: 'id', style: HttpParamStyles.Simple, required: true }],
        body: { contents: [{ mediaType: 'application/json', schema: { default: '{}' } }] },
      },
    });
  });
});
