export const simpleApiWithInternalOperations = {
  swagger: '2.0',
  info: {
    title: 'To-dos',
    description: 'Great API, but has internal operations.',
    version: '1.0',
    contact: {
      name: 'Stoplight',
      url: 'https://stoplight.io',
    },
    license: {
      name: 'MIT',
    },
  },
  host: 'todos.stoplight.io',
  schemes: ['https', 'http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  securityDefinitions: {
    apikey: {
      name: 'apikey',
      type: 'apiKey',
      in: 'query',
      description: "Use `?apikey=123` to authenticate requests. It's super secure.",
    },
  },
  tags: [
    {
      name: 'Todos',
    },
  ],
  paths: {
    '/todos/{todoId}': {
      parameters: [
        {
          name: 'todoId',
          in: 'path',
          required: true,
          type: 'string',
        },
      ],
      get: {
        operationId: 'GET_todo',
        summary: 'Get Todo',
        tags: ['Todos'],
        'x-internal': true,
        responses: {
          '200': {
            description: '',
            schema: {
              $ref: './models/todo-full.v1.json',
            },
            examples: {
              'application/json': {
                id: 1,
                name: 'get food',
                completed: false,
                completed_at: '1955-04-23T13:22:52.685Z',
                created_at: '1994-11-05T03:26:51.471Z',
                updated_at: '1989-07-29T11:30:06.701Z',
              },
            },
          },
          '404': {
            $ref: '../common/openapi.v1.yaml#/responses/404',
          },
          '500': {
            $ref: '../common/openapi.v1.yaml#/responses/500',
          },
        },
      },
      put: {
        operationId: 'PUT_todos',
        summary: 'Update Todo',
        tags: ['Todos'],
        parameters: [
          {
            name: 'body',
            in: 'body',
            schema: {
              $ref: './models/todo-partial.v1.json',
              example: {
                name: "my todo's new name",
                completed: false,
              },
            },
          },
        ],
        responses: {
          '200': {
            description: '',
            schema: {
              $ref: './models/todo-full.v1.json',
            },
            examples: {
              'application/json': {
                id: 9000,
                name: "It's Over 9000!!!",
                completed: true,
                completed_at: null,
                created_at: '2014-08-28T14:14:28.494Z',
                updated_at: '2015-08-28T14:14:28.494Z',
              },
            },
          },
          '401': {
            $ref: '../common/openapi.v1.yaml#/responses/401',
          },
          '404': {
            $ref: '../common/openapi.v1.yaml#/responses/404',
          },
          '500': {
            $ref: '../common/openapi.v1.yaml#/responses/500',
          },
        },
        security: [
          {
            apikey: [],
          },
        ],
      },
      delete: {
        operationId: 'DELETE_todo',
        summary: 'Delete Todo',
        tags: ['Todos'],
        responses: {
          '204': {
            description: '',
          },
          '401': {
            $ref: '../common/openapi.v1.yaml#/responses/401',
          },
          '404': {
            $ref: '../common/openapi.v1.yaml#/responses/404',
          },
          '500': {
            $ref: '../common/openapi.v1.yaml#/responses/500',
          },
        },
        security: [
          {
            apikey: [],
          },
        ],
      },
    },
    '/todos': {
      post: {
        operationId: 'POST_todos',
        summary: 'Create Todo',
        tags: ['Todos'],
        parameters: [
          {
            name: 'body',
            in: 'body',
            schema: {
              $ref: './models/todo-partial.v1.json',
              example: {
                name: "my todo's name",
                completed: false,
              },
            },
          },
        ],
        responses: {
          '201': {
            description: '',
            schema: {
              $ref: './models/todo-full.v1.json',
            },
            examples: {
              'application/json': {
                id: 9000,
                name: "It's Over 9000!!!",
                completed: null,
                completed_at: null,
                created_at: '2014-08-28T14:14:28.494Z',
                updated_at: '2014-08-28T14:14:28.494Z',
              },
            },
          },
          '401': {
            $ref: '../common/openapi.v1.yaml#/responses/401',
          },
          '500': {
            $ref: '../common/openapi.v1.yaml#/responses/500',
          },
        },
        security: [
          {
            apikey: [],
          },
        ],
        description: 'This creates a Todo object.\n\nTesting `inline code`.',
      },
      get: {
        operationId: 'GET_todos',
        summary: 'List Todos',
        tags: ['Todos'],
        parameters: [
          {
            $ref: '../common/openapi.v1.yaml#/parameters/limit',
          },
          {
            $ref: '../common/openapi.v1.yaml#/parameters/skip',
          },
        ],
        responses: {
          '200': {
            description: 'wefwefwef',
            schema: {
              type: 'array',
              items: {
                $ref: './models/todo-full.v1.json',
              },
            },
            examples: {
              'application/json': [
                {
                  id: 1,
                  name: 'design the thingz',
                  completed: true,
                },
                {
                  id: 2,
                  name: 'mock the thingz',
                  completed: true,
                },
                {
                  id: 3,
                  name: 'code the thingz',
                  completed: false,
                },
              ],
            },
          },
          '500': {
            $ref: '../common/openapi.v1.yaml#/responses/500',
          },
        },
        description: 'This returns a list of todos.',
      },
    },
  },
  definitions: {
    InternalSchema: {
      title: 'Internal Schema',
      description: 'Fun Internal Schema',
      schema: { type: 'object' },
      'x-internal': true,
    },
  },
};
