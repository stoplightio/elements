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
            id: 'd3404a8f3b495',
            name: 'operation-tag',
          },
          {
            id: 'd0460398c5f2b',
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
            id: 'c35bc6b301d97',
            method: 'get',
            path: '/todos',
            summary: 'Get Todos',
            responses: [],
            servers: [],
            request: {
              body: {
                id: '704ac0beb3748',
                contents: [],
              },
              headers: [],
              query: [],
              cookie: [],
              path: [],
            },
            tags: [
              {
                id: 'd3404a8f3b495',
                name: 'operation-tag',
              },
            ],
            security: [],
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
            id: 'd3404a8f3b495',
            name: 'operation-tag',
          },
          {
            id: 'd0460398c5f2b',
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
                id: 'd3404a8f3b495',
                name: 'operation-tag',
              },
            ],
            security: [],
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
              body: {
                id: '67f97b0ec0ef8',
                contents: [],
              },
              headers: [],
              query: [],
              cookie: [],
              path: [],
            },
            tags: [],
            security: [],
            extensions: {},
          },
          tags: [],
          name: 'get-todos',
        },
      ],
    });
  });
});
