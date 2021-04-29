import { transformOasToServiceNode } from '../';

const oas3Document = {
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
    expect(transformOasToServiceNode(oas3Document)).toEqual({
      type: 'http_service',
      uri: '/',
      name: 'oas3',
      data: {
        id: '?http-service-id?',
        version: '1.0.0',
        name: 'oas3',
        tags: [
          {
            name: 'operation-tag',
          },
          {
            name: 'model-tag',
          },
        ],
      },
      tags: ['operation-tag', 'model-tag'],
      children: [
        {
          type: 'http_operation',
          uri: '/paths/todos/get',
          data: {
            id: '?http-operation-id?',
            method: 'get',
            path: '/todos',
            summary: 'Get Todos',
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
                name: 'operation-tag',
              },
            ],
            security: [],
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
    expect(transformOasToServiceNode(oas2Document)).toEqual({
      type: 'http_service',
      uri: '/',
      name: 'oas2',
      data: {
        id: '?http-service-id?',
        name: 'oas2',
        tags: [
          {
            name: 'operation-tag',
          },
          {
            name: 'model-tag',
          },
        ],
        version: '1.0.0',
      },
      tags: ['operation-tag', 'model-tag'],
      children: [
        {
          type: 'http_operation',
          uri: '/paths/todos/get',
          data: {
            id: '?http-operation-id?',
            method: 'get',
            path: '/todos',
            summary: 'Get Todos',
            responses: [],
            servers: [],
            request: {},
            tags: [
              {
                name: 'operation-tag',
              },
            ],
            security: [],
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
        id: '?http-service-id?',
        version: '1.0.0',
        name: 'oas3',
      },
      children: [
        {
          type: 'http_operation',
          uri: '/operations/get-todos',
          data: {
            id: '?http-operation-id?',
            iid: 'get-todos',
            method: 'get',
            path: '/todos',
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
            tags: [],
            security: [],
          },
          tags: [],
          name: 'get-todos',
        },
      ],
    });
  });
});
