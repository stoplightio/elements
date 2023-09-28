import { transformOasToServiceNode } from '../';

const oas3Document = {
  'x-stoplight': { id: 'abc' },
  openapi: '3.0.0',
  info: {
    title: 'oas3',
    version: '1.0.0',
  },
  tags: [{ name: 'operation-tag' }, { name: 'model-tag' }],
  paths: {
    '/todos': {
      get: {
        summary: 'Get Todos',
        tags: ['operation-tag'],
      },
    },
  },
  components: {
    schemas: {
      Todo: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
          },
        },
        title: 'Todo',
        'x-tags': ['model-tag'],
      },
    },
  },
};

const oas2Document = {
  'x-stoplight': { id: 'abc' },
  swagger: '2.0.0',
  info: {
    title: 'oas2',
    version: '1.0.0',
  },
  tags: [{ name: 'operation-tag' }, { name: 'model-tag' }],
  paths: {
    '/todos': {
      get: {
        summary: 'Get Todos',
        tags: ['operation-tag'],
      },
    },
  },
  definitions: {
    Todo: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
        },
      },
      title: 'Todo',
      'x-tags': ['model-tag'],
    },
  },
};

describe('computeOasNodes', () => {
  it('should return null for invalid document', () => {
    expect(transformOasToServiceNode({})).toBeNull();
  });

  it('should return oas nodes for oas3 document', () => {
    expect(transformOasToServiceNode(oas3Document)).toStrictEqual({
      type: 'http_service',
      uri: '/',
      name: 'oas3',
      data: {
        id: 'abc',
        version: '1.0.0',
        name: 'oas3',
        tags: [
          {
            id: '68c460dd9e97a',
            name: 'operation-tag',
          },
          {
            id: 'feec8b579ae6b',
            name: 'model-tag',
          },
        ],
        extensions: {
          'x-stoplight': {
            id: 'abc',
          },
        },
        infoExtensions: {},
      },
      tags: ['operation-tag', 'model-tag'],
      children: [
        {
          type: 'http_operation',
          uri: '/paths/todos/get',
          data: {
            id: 'c35bc6b301d97',
            method: 'get',
            path: '/todos',
            summary: 'Get Todos',
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
                id: '68c460dd9e97a',
                name: 'operation-tag',
              },
            ],
            security: [],
            securityDeclarationType: 'inheritedFromService',
            extensions: {},
          },
          name: 'Get Todos',
          tags: ['operation-tag'],
        },
        {
          type: 'model',
          uri: '/schemas/Todo',
          data: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
              },
            },
            title: 'Todo',
            'x-tags': ['model-tag'],
          },
          name: 'Todo',
          tags: ['model-tag'],
        },
      ],
    });
  });

  it('should return oas nodes for oas2 document', () => {
    expect(transformOasToServiceNode(oas2Document)).toStrictEqual({
      type: 'http_service',
      uri: '/',
      name: 'oas2',
      data: {
        id: 'abc',
        name: 'oas2',
        tags: [
          {
            id: '68c460dd9e97a',
            name: 'operation-tag',
          },
          {
            id: 'feec8b579ae6b',
            name: 'model-tag',
          },
        ],
        extensions: {
          'x-stoplight': {
            id: 'abc',
          },
        },
        infoExtensions: {},
        version: '1.0.0',
      },
      tags: ['operation-tag', 'model-tag'],
      children: [
        {
          type: 'http_operation',
          uri: '/paths/todos/get',
          data: {
            id: 'c35bc6b301d97',
            method: 'get',
            path: '/todos',
            summary: 'Get Todos',
            responses: [],
            servers: [],
            request: {
              cookie: [],
              headers: [],
              path: [],
              query: [],
            },
            tags: [
              {
                id: '68c460dd9e97a',
                name: 'operation-tag',
              },
            ],
            security: [],
            securityDeclarationType: 'inheritedFromService',
            extensions: {},
          },
          name: 'Get Todos',
          tags: ['operation-tag'],
        },
        {
          type: 'model',
          uri: '/schemas/Todo',
          data: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
              },
            },
            title: 'Todo',
            'x-tags': ['model-tag'],
          },
          name: 'Todo',
          tags: ['model-tag'],
        },
      ],
    });
  });

  it('should fallback to operationId', () => {
    expect(
      transformOasToServiceNode({
        'x-stoplight': { id: 'def' },
        openapi: '3.0.0',
        info: {
          title: 'oas3',
          version: '1.0.0',
        },
        paths: {
          '/todos': {
            get: {
              operationId: 'get-todos',
            },
          },
        },
      }),
    ).toEqual({
      type: 'http_service',
      uri: '/',
      name: 'oas3',
      tags: [],
      data: {
        id: 'def',
        version: '1.0.0',
        name: 'oas3',
        extensions: {
          'x-stoplight': {
            id: 'def',
          },
        },
        infoExtensions: {},
      },
      children: [
        {
          type: 'http_operation',
          uri: '/operations/get-todos',
          data: {
            id: 'a61f53c324669',
            iid: 'get-todos',
            method: 'get',
            path: '/todos',
            responses: [],
            servers: [],
            request: {
              headers: [],
              query: [],
              cookie: [],
              path: [],
            },
            tags: [],
            security: [],
            securityDeclarationType: 'inheritedFromService',
            extensions: {},
          },
          tags: [],
          name: 'get-todos',
        },
      ],
    });
  });

  it('should not throw error for non-common url paths', () => {
    expect(
      transformOasToServiceNode({
        'x-stoplight': { id: 'def' },
        openapi: '3.0.0',
        info: {
          title: 'oas3',
          version: '1.0.0',
        },
        paths: {
          '/todos/{id}/flow)': {
            get: {
              operationId: 'get-todos',
            },
          },
        },
      }),
    ).toEqual({
      type: 'http_service',
      uri: '/',
      name: 'oas3',
      tags: [],
      data: {
        id: 'def',
        version: '1.0.0',
        name: 'oas3',
        extensions: {
          'x-stoplight': {
            id: 'def',
          },
        },
        infoExtensions: {},
      },
      children: [
        {
          type: 'http_operation',
          uri: '/operations/get-todos',
          data: {
            id: '7b7e36ffa6501',
            iid: 'get-todos',
            method: 'get',
            path: '/todos/{id}/flow)',
            responses: [],
            servers: [],
            request: {
              headers: [],
              query: [],
              cookie: [],
              path: [],
            },
            tags: [],

            securityDeclarationType: 'inheritedFromService',
            security: [],
            extensions: {},
          },
          tags: [],
          name: 'get-todos',
        },
      ],
    });
  });

  it('should filter out unused security nodes and not show duplicate nodes', () => {
    const serviceNode = transformOasToServiceNode({
      openapi: '3.1.0',
      'x-stoplight': {
        id: 'nso1sfqvio7bp',
      },
      info: {
        title: 'Test',
        version: '1.0',
      },
      servers: [
        {
          url: 'http://localhost:3000',
        },
      ],
      paths: {
        '/users': {
          get: {
            summary: 'Your GET endpoint',
            tags: [],
            responses: {},
            operationId: 'get-users',
            'x-stoplight': {
              id: 'oblhqa66gbqqg',
            },
            security: [
              {
                API_Key_Query: [],
              },
            ],
          },
        },
      },
      components: {
        schemas: {},
        securitySchemes: {
          API_Key_Query: {
            name: 'API Key',
            type: 'apiKey',
            in: 'query',
          },
          API_Key_Header: {
            name: 'API Key',
            type: 'apiKey',
            in: 'header',
          },
          API_Key_Cookie: {
            name: 'API Key',
            type: 'apiKey',
            in: 'cookie',
          },
        },
      },
      security: [
        {
          API_Key_Query: [],
        },
      ],
    });

    expect(serviceNode?.data.security).toHaveLength(1);
  });
});
