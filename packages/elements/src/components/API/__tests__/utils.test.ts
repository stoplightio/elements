import { NodeType } from '@stoplight/types';
import { OpenAPIObject as _OpenAPIObject, PathObject } from 'openapi3-ts';

import { transformOasToServiceNode } from '../../../utils/oas';
import { OperationNode, WebhookNode } from '../../../utils/oas/types';
import { computeAPITree, computeTagGroups } from '../utils';

type OpenAPIObject = Partial<_OpenAPIObject> & {
  webhooks?: PathObject;
};
describe.each([
  ['paths', NodeType.HttpOperation, 'Endpoints', 'path'],
  ['webhooks', NodeType.HttpWebhook, 'Webhooks', 'name'],
] as const)('when grouping from "%s" as %s', (pathProp, nodeType, title, parentKeyProp) => {
  describe('computeTagGroups', () => {
    it('orders endpoints according to specified tags', () => {
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
        [pathProp]: {
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
      expect(serviceNode ? computeTagGroups<OperationNode | WebhookNode>(serviceNode, nodeType) : null).toEqual({
        groups: [
          {
            title: 'beta',
            items: [
              {
                type: nodeType,
                uri: `/${pathProp}/b/get`,
                data: {
                  id: expect.any(String),
                  method: 'get',
                  [parentKeyProp]: '/b',
                  responses: [],
                  servers: [],
                  request: {
                    headers: [],
                    query: [],
                    cookie: [],
                    path: [],
                  },
                  tags: [
                    {
                      id: '9695eccd3aa64',
                      name: 'beta',
                    },
                  ],
                  security: [],
                  securityDeclarationType: 'inheritedFromService',
                  extensions: {},
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
                type: nodeType,
                uri: `/${pathProp}/a/get`,
                data: {
                  id: expect.any(String),
                  method: 'get',
                  [parentKeyProp]: '/a',
                  responses: [],
                  servers: [],
                  request: {
                    headers: [],
                    query: [],
                    cookie: [],
                    path: [],
                  },
                  tags: [
                    {
                      id: 'df0b92b61db3a',
                      name: 'alpha',
                    },
                  ],
                  security: [],
                  securityDeclarationType: 'inheritedFromService',
                  extensions: {},
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
        [pathProp]: {
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
      expect(serviceNode ? computeTagGroups<OperationNode | WebhookNode>(serviceNode, nodeType) : null).toEqual({
        groups: [
          {
            title: 'beta',
            items: [
              {
                type: nodeType,
                uri: `/${pathProp}/c/get`,
                data: {
                  id: expect.any(String),
                  method: 'get',
                  [parentKeyProp]: '/c',
                  responses: [],
                  servers: [],
                  request: { headers: [], query: [], cookie: [], path: [] },
                  tags: [{ id: '9695eccd3aa64', name: 'beta' }],
                  security: [],
                  securityDeclarationType: 'inheritedFromService',
                  extensions: {},
                },
                name: '/c',
                tags: ['beta'],
              },
              {
                type: nodeType,
                uri: `/${pathProp}/b/get`,
                data: {
                  id: expect.any(String),
                  method: 'get',
                  [parentKeyProp]: '/b',
                  responses: [],
                  servers: [],
                  request: { headers: [], query: [], cookie: [], path: [] },
                  tags: [{ id: '9695eccd3aa64', name: 'beta' }],
                  security: [],
                  securityDeclarationType: 'inheritedFromService',
                  extensions: {},
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
                type: nodeType,
                uri: `/${pathProp}/a/get`,
                data: {
                  id: expect.any(String),
                  method: 'get',
                  [parentKeyProp]: '/a',
                  responses: [],
                  servers: [],
                  request: { headers: [], query: [], cookie: [], path: [] },
                  tags: [{ id: 'df0b92b61db3a', name: 'alpha' }],
                  security: [],
                  securityDeclarationType: 'inheritedFromService',
                  extensions: {},
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
        [pathProp]: {
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
      expect(serviceNode ? computeTagGroups<OperationNode | WebhookNode>(serviceNode, nodeType) : null).toEqual({
        groups: [
          {
            title: 'beta',
            items: [
              {
                type: nodeType,
                uri: `/${pathProp}/b/get`,
                data: {
                  id: expect.any(String),
                  method: 'get',
                  [parentKeyProp]: '/b',
                  responses: [],
                  servers: [],
                  request: { headers: [], query: [], cookie: [], path: [] },
                  tags: [{ id: '9695eccd3aa64', name: 'beta' }],
                  security: [],
                  securityDeclarationType: 'inheritedFromService',
                  extensions: {},
                },
                name: '/b',
                tags: ['beta'],
              },
              {
                type: nodeType,
                uri: `/${pathProp}/b/delete`,
                data: {
                  id: expect.any(String),
                  method: 'delete',
                  [parentKeyProp]: '/b',
                  responses: [],
                  servers: [],
                  request: { headers: [], query: [], cookie: [], path: [] },
                  tags: [{ id: '9695eccd3aa64', name: 'beta' }],
                  security: [],
                  securityDeclarationType: 'inheritedFromService',
                  extensions: {},
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
                type: nodeType,
                uri: `/${pathProp}/a/get`,
                data: {
                  id: expect.any(String),
                  method: 'get',
                  [parentKeyProp]: '/a',
                  responses: [],
                  servers: [],
                  request: { headers: [], query: [], cookie: [], path: [] },
                  tags: [{ id: 'df0b92b61db3a', name: 'alpha' }],
                  security: [],
                  securityDeclarationType: 'inheritedFromService',
                  extensions: {},
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
        [pathProp]: {},
        tags: {
          $ref: './tags',
        },
      };

      const serviceNode = transformOasToServiceNode(apiDocument);
      expect(serviceNode ? computeTagGroups<OperationNode | WebhookNode>(serviceNode, nodeType) : null).toEqual({
        groups: [],
        ungrouped: [],
      });
    });

    it('leaves tag casing unchanged', () => {
      const apiDocument: OpenAPIObject = {
        openapi: '3.0.0',
        info: {
          title: 'some api',
          version: '1.0.0',
          description: 'some description',
        },
        tags: [
          {
            name: 'Beta',
          },
          {
            name: 'alpha',
          },
        ],
        [pathProp]: {
          '/a': {
            get: {
              tags: ['alpha'],
            },
          },
          '/b': {
            get: {
              tags: ['Beta'],
            },
          },
        },
      };

      const serviceNode = transformOasToServiceNode(apiDocument);
      expect(serviceNode ? computeTagGroups<OperationNode | WebhookNode>(serviceNode, nodeType) : null).toEqual({
        groups: [
          {
            title: 'Beta',
            items: [
              {
                type: nodeType,
                uri: `/${pathProp}/b/get`,
                data: {
                  id: expect.any(String),
                  method: 'get',
                  [parentKeyProp]: '/b',
                  responses: [],
                  servers: [],
                  request: {
                    headers: [],
                    query: [],
                    cookie: [],
                    path: [],
                  },
                  tags: [
                    {
                      name: 'Beta',
                      id: 'c6a65e6457b55',
                    },
                  ],
                  security: [],
                  securityDeclarationType: 'inheritedFromService',
                  extensions: {},
                },
                name: '/b',
                tags: ['Beta'],
              },
            ],
          },
          {
            title: 'alpha',
            items: [
              {
                type: nodeType,
                uri: `/${pathProp}/a/get`,
                data: {
                  id: expect.any(String),
                  method: 'get',
                  [parentKeyProp]: '/a',
                  responses: [],
                  servers: [],
                  request: {
                    headers: [],
                    query: [],
                    cookie: [],
                    path: [],
                  },
                  tags: [
                    {
                      id: 'df0b92b61db3a',
                      name: 'alpha',
                    },
                  ],
                  security: [],
                  securityDeclarationType: 'inheritedFromService',
                  extensions: {},
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

    it('matches mixed tag casing', () => {
      const apiDocument: OpenAPIObject = {
        openapi: '3.0.0',
        info: {
          title: 'some api',
          version: '1.0.0',
          description: 'some description',
        },
        tags: [
          {
            name: 'Beta',
          },
          {
            name: 'alpha',
          },
        ],
        [pathProp]: {
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
      expect(serviceNode ? computeTagGroups<OperationNode | WebhookNode>(serviceNode, nodeType) : null).toEqual({
        groups: [
          {
            title: 'Beta',
            items: [
              {
                type: nodeType,
                uri: `/${pathProp}/b/get`,
                data: {
                  id: expect.any(String),
                  method: 'get',
                  [parentKeyProp]: '/b',
                  responses: [],
                  servers: [],
                  request: {
                    headers: [],
                    query: [],
                    cookie: [],
                    path: [],
                  },
                  tags: [
                    {
                      id: '9695eccd3aa64',
                      name: 'beta',
                    },
                  ],
                  security: [],
                  securityDeclarationType: 'inheritedFromService',
                  extensions: {},
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
                type: nodeType,
                uri: `/${pathProp}/a/get`,
                data: {
                  id: expect.any(String),
                  method: 'get',
                  [parentKeyProp]: '/a',
                  responses: [],
                  servers: [],
                  request: {
                    headers: [],
                    query: [],
                    cookie: [],
                    path: [],
                  },
                  tags: [
                    {
                      id: 'df0b92b61db3a',
                      name: 'alpha',
                    },
                  ],
                  security: [],
                  securityDeclarationType: 'inheritedFromService',
                  extensions: {},
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
  });

  describe('computeAPITree', () => {
    it('generates API ToC tree', () => {
      const apiDocument: OpenAPIObject = {
        openapi: '3.0.0',
        info: {
          title: 'some api',
          version: '1.0.0',
          description: 'some description',
        },
        [pathProp]: {
          '/something': {
            get: {
              responses: {
                200: {
                  schema: { $ref: '#/definitions/schemas/ImportantSchema' },
                },
              },
            },
          },
        },
        components: {
          schemas: {
            ImportantSchema: {
              type: 'object',
              properties: {
                a: { type: 'string' },
              },
            },
          },
        },
      };

      expect(computeAPITree(transformOasToServiceNode(apiDocument)!)).toEqual([
        {
          id: '/',
          meta: '',
          slug: '/',
          title: 'Overview',
          type: 'overview',
        },
        {
          title,
        },
        {
          id: `/${pathProp}/something/get`,
          meta: 'get',
          slug: `/${pathProp}/something/get`,
          title: '/something',
          type: nodeType,
        },
        { title: 'Schemas' },
        {
          id: '/schemas/ImportantSchema',
          slug: '/schemas/ImportantSchema',
          title: 'ImportantSchema',
          type: 'model',
          meta: '',
        },
      ]);
    });

    it('allows to hide schemas from ToC', () => {
      const apiDocument: OpenAPIObject = {
        openapi: '3.0.0',
        info: {
          title: 'some api',
          version: '1.0.0',
          description: 'some description',
        },
        [pathProp]: {
          '/something': {
            get: {
              responses: {
                200: {
                  schema: { $ref: '#/definitions/schemas/ImportantSchema' },
                },
              },
            },
          },
        },
        components: {
          schemas: {
            ImportantSchema: {
              type: 'object',
              properties: {
                a: { type: 'string' },
              },
            },
          },
        },
      };

      expect(computeAPITree(transformOasToServiceNode(apiDocument)!, { hideSchemas: true })).toEqual([
        {
          id: '/',
          meta: '',
          slug: '/',
          title: 'Overview',
          type: 'overview',
        },
        {
          title,
        },
        {
          id: `/${pathProp}/something/get`,
          meta: 'get',
          slug: `/${pathProp}/something/get`,
          title: '/something',
          type: nodeType,
        },
      ]);
    });

    it('allows to hide internal operations from ToC', () => {
      const apiDocument: OpenAPIObject = {
        openapi: '3.0.0',
        info: {
          title: 'some api',
          version: '1.0.0',
          description: 'some description',
        },
        [pathProp]: {
          '/something': {
            get: {},
            post: {
              'x-internal': true,
            },
          },
        },
      };

      expect(computeAPITree(transformOasToServiceNode(apiDocument)!, { hideInternal: true })).toEqual([
        {
          id: '/',
          meta: '',
          slug: '/',
          title: 'Overview',
          type: 'overview',
        },
        {
          title,
        },
        {
          id: `/${pathProp}/something/get`,
          meta: 'get',
          slug: `/${pathProp}/something/get`,
          title: '/something',
          type: nodeType,
        },
      ]);
    });

    it('allows to hide nested internal operations from ToC', () => {
      const apiDocument: OpenAPIObject = {
        openapi: '3.0.0',
        info: {
          title: 'some api',
          version: '1.0.0',
          description: 'some description',
        },
        tags: [
          {
            name: 'a',
          },
        ],
        [pathProp]: {
          '/something': {
            get: {
              tags: ['a'],
            },
            post: {
              'x-internal': true,
              tags: ['a'],
            },
          },
        },
      };

      expect(computeAPITree(transformOasToServiceNode(apiDocument)!, { hideInternal: true })).toEqual([
        {
          id: '/',
          meta: '',
          slug: '/',
          title: 'Overview',
          type: 'overview',
        },
        {
          title,
        },
        {
          title: 'a',
          itemsType: nodeType,
          items: [
            {
              id: `/${pathProp}/something/get`,
              meta: 'get',
              slug: `/${pathProp}/something/get`,
              title: '/something',
              type: nodeType,
            },
          ],
        },
      ]);
    });

    it('allows to hide internal models from ToC', () => {
      const apiDocument: OpenAPIObject = {
        openapi: '3.0.0',
        info: {
          title: 'some api',
          version: '1.0.0',
          description: 'some description',
        },
        [pathProp]: {},
        components: {
          schemas: {
            SomeInternalSchema: {
              'x-internal': true,
            },
          },
        },
      };

      expect(computeAPITree(transformOasToServiceNode(apiDocument)!, { hideInternal: true })).toEqual([
        {
          id: '/',
          meta: '',
          slug: '/',
          title: 'Overview',
          type: 'overview',
        },
      ]);
    });

    it('excludes groups with no items', () => {
      const apiDocument: OpenAPIObject = {
        openapi: '3.0.0',
        info: {
          title: 'some api',
          version: '1.0.0',
          description: 'some description',
        },
        tags: [
          {
            name: 'a',
          },
        ],
        [pathProp]: {
          '/something': {
            post: {
              'x-internal': true,
              tags: ['a'],
            },
          },
          '/something-else': {
            post: {
              tags: ['b'],
            },
          },
        },
      };

      expect(computeAPITree(transformOasToServiceNode(apiDocument)!, { hideInternal: true })).toEqual([
        {
          id: '/',
          meta: '',
          slug: '/',
          title: 'Overview',
          type: 'overview',
        },
        {
          title,
        },
        {
          title: 'b',
          itemsType: nodeType,
          items: [
            {
              id: `/${pathProp}/something-else/post`,
              meta: 'post',
              slug: `/${pathProp}/something-else/post`,
              title: '/something-else',
              type: nodeType,
            },
          ],
        },
      ]);
    });
  });
});
