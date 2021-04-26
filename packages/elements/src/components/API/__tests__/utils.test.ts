import { OpenAPIObject } from 'openapi3-ts';

import { transformOasToServiceNode } from '../../../utils/oas';
import { computeTagGroups } from '../utils';

describe('computeTagGroups', () => {
  it('orders endpoints according to specificed tags', () => {
    const apiDocument: OpenAPIObject = {
      openapi: '3.0.0',
      info: {
        title: 'some api',
        version: '1.0.0',
        description: 'some description',
      },
      tags: [
        {
          name: 'beta',
        },
        {
          name: 'alpha',
        },
      ],
      paths: {
        '/a': {
          get: {
            tags: ['alpha'],
          },
        },
        '/b': {
          get: {
            tags: ['beta'],
          },
        },
      },
    };

    const serviceNode = transformOasToServiceNode(apiDocument);
    expect(serviceNode ? computeTagGroups(serviceNode) : null).toEqual({
      groups: [
        {
          title: 'beta',
          items: [
            {
              type: 'http_operation',
              uri: '/paths/b/get',
              data: {
                id: '?http-operation-id?',
                method: 'get',
                path: '/b',
                responses: [],
                servers: [],
                request: {
                  body: {
                    contents: [],
                  },
                  headers: [],
                  query: [],
                  cookie: [],
                  path: [],
                },
                tags: [
                  {
                    name: 'beta',
                  },
                ],
                security: [],
              },
              name: '/b',
              tags: ['beta'],
            },
          ],
        },
        {
          title: 'alpha',
          items: [
            {
              type: 'http_operation',
              uri: '/paths/a/get',
              data: {
                id: '?http-operation-id?',
                method: 'get',
                path: '/a',
                responses: [],
                servers: [],
                request: {
                  body: {
                    contents: [],
                  },
                  headers: [],
                  query: [],
                  cookie: [],
                  path: [],
                },
                tags: [
                  {
                    name: 'alpha',
                  },
                ],
                security: [],
              },
              name: '/a',
              tags: ['alpha'],
            },
          ],
        },
      ],
      ungrouped: [],
    });
  });

  it("within the tags it doesn't reorder the endpoints", () => {
    const apiDocument: OpenAPIObject = {
      openapi: '3.0.0',
      info: {
        title: 'some api',
        version: '1.0.0',
        description: 'some description',
      },
      tags: [
        {
          name: 'beta',
        },
        {
          name: 'alpha',
        },
      ],
      paths: {
        '/a': {
          get: {
            tags: ['alpha'],
          },
        },
        '/c': {
          get: {
            tags: ['beta'],
          },
        },
        '/b': {
          get: {
            tags: ['beta'],
          },
        },
      },
    };

    const serviceNode = transformOasToServiceNode(apiDocument);
    expect(serviceNode ? computeTagGroups(serviceNode) : null).toEqual({
      groups: [
        {
          title: 'beta',
          items: [
            {
              type: 'http_operation',
              uri: '/paths/c/get',
              data: {
                id: '?http-operation-id?',
                method: 'get',
                path: '/c',
                responses: [],
                servers: [],
                request: { body: { contents: [] }, headers: [], query: [], cookie: [], path: [] },
                tags: [{ name: 'beta' }],
                security: [],
              },
              name: '/c',
              tags: ['beta'],
            },
            {
              type: 'http_operation',
              uri: '/paths/b/get',
              data: {
                id: '?http-operation-id?',
                method: 'get',
                path: '/b',
                responses: [],
                servers: [],
                request: { body: { contents: [] }, headers: [], query: [], cookie: [], path: [] },
                tags: [{ name: 'beta' }],
                security: [],
              },
              name: '/b',
              tags: ['beta'],
            },
          ],
        },
        {
          title: 'alpha',
          items: [
            {
              type: 'http_operation',
              uri: '/paths/a/get',
              data: {
                id: '?http-operation-id?',
                method: 'get',
                path: '/a',
                responses: [],
                servers: [],
                request: { body: { contents: [] }, headers: [], query: [], cookie: [], path: [] },
                tags: [{ name: 'alpha' }],
                security: [],
              },
              name: '/a',
              tags: ['alpha'],
            },
          ],
        },
      ],
      ungrouped: [],
    });
  });

  it("within the tags it doesn't reorder the methods", () => {
    const apiDocument: OpenAPIObject = {
      openapi: '3.0.0',
      info: {
        title: 'some api',
        version: '1.0.0',
        description: 'some description',
      },
      tags: [
        {
          name: 'beta',
        },
        {
          name: 'alpha',
        },
      ],
      paths: {
        '/a': {
          get: {
            tags: ['alpha'],
          },
        },
        '/b': {
          get: {
            tags: ['beta'],
          },
          delete: {
            tags: ['beta'],
          },
        },
      },
    };

    const serviceNode = transformOasToServiceNode(apiDocument);
    expect(serviceNode ? computeTagGroups(serviceNode) : null).toEqual({
      groups: [
        {
          title: 'beta',
          items: [
            {
              type: 'http_operation',
              uri: '/paths/b/get',
              data: {
                id: '?http-operation-id?',
                method: 'get',
                path: '/b',
                responses: [],
                servers: [],
                request: { body: { contents: [] }, headers: [], query: [], cookie: [], path: [] },
                tags: [{ name: 'beta' }],
                security: [],
              },
              name: '/b',
              tags: ['beta'],
            },
            {
              type: 'http_operation',
              uri: '/paths/b/delete',
              data: {
                id: '?http-operation-id?',
                method: 'delete',
                path: '/b',
                responses: [],
                servers: [],
                request: { body: { contents: [] }, headers: [], query: [], cookie: [], path: [] },
                tags: [{ name: 'beta' }],
                security: [],
              },
              name: '/b',
              tags: ['beta'],
            },
          ],
        },
        {
          title: 'alpha',
          items: [
            {
              type: 'http_operation',
              uri: '/paths/a/get',
              data: {
                id: '?http-operation-id?',
                method: 'get',
                path: '/a',
                responses: [],
                servers: [],
                request: { body: { contents: [] }, headers: [], query: [], cookie: [], path: [] },
                tags: [{ name: 'alpha' }],
                security: [],
              },
              name: '/a',
              tags: ['alpha'],
            },
          ],
        },
      ],
      ungrouped: [],
    });
  });

  it("doesn't throw with incorrect tags value", () => {
    const apiDocument = {
      openapi: '3.0.0',
      info: {
        title: 'some api',
        version: '1.0.0',
        description: 'some description',
      },
      paths: {},
      tags: {
        $ref: './tags',
      },
    };

    const serviceNode = transformOasToServiceNode(apiDocument);
    expect(serviceNode ? computeTagGroups(serviceNode) : null).toEqual({ groups: [], ungrouped: [] });
  });
});
