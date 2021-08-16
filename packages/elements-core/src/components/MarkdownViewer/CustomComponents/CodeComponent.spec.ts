import { HttpParamStyles, IHttpRequest } from '@stoplight/types';

import { parseHttpRequest } from './CodeComponent';

describe('parseHttpRequest', () => {
  it('parses HttpRequest with relative url', () => {
    const request: IHttpRequest = {
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
      servers: [{ url: 'http://test' }],
      request: {
        headers: [],
        query: [],
      },
      responses: [],
    });
  });

  it('parses HttpRequest with absolute url', () => {
    const request: IHttpRequest = {
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
      servers: [{ url: 'http://test' }],
      request: {
        headers: [],
        query: [],
      },
      responses: [],
    });
  });

  it('parses HttpRequest parameters', () => {
    const request: IHttpRequest = {
      method: 'post',
      url: '/todos/{id}',
      baseUrl: 'http://test',
      query: {
        limit: ['10'],
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
        query: [{ name: 'limit', style: HttpParamStyles.Form, schema: { default: '10' } }],
        headers: [{ name: 'apikey', style: HttpParamStyles.Simple, schema: { default: '123' } }],
        path: [{ name: 'id', style: HttpParamStyles.Simple, required: true }],
        body: { contents: [{ mediaType: 'application/json', schema: { default: '{}' } }] },
      },
    });
  });
});
