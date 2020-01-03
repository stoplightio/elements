import { HttpParamStyles, IHttpOperation } from '@stoplight/types';

const httpOperation: IHttpOperation = {
  id: '?http-operation-id?',
  iid: 'PUT_todos',
  method: 'put',
  path: '/todos/{todoId}',
  summary: 'Update Todo',
  responses: [
    {
      code: '200',
      description: '',
      headers: [],
      contents: [
        {
          mediaType: 'application/json',
          schema: {
            $schema: 'http://json-schema.org/draft-04/schema#',
            title: 'Todo Full',
            allOf: [
              {
                $schema: 'http://json-schema.org/draft-04/schema#',
                title: 'Todo Partial',
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                  },
                  completed: {
                    type: ['boolean', 'null'],
                  },
                },
                required: ['name', 'completed'],
                'x-tags': ['Todos'],
              },
              {
                type: 'object',
                properties: {
                  id: {
                    type: 'integer',
                    minimum: 0,
                    maximum: 1000000,
                  },
                  completed_at: {
                    type: ['string', 'null'],
                    format: 'date-time',
                  },
                  created_at: {
                    type: 'string',
                    format: 'date-time',
                  },
                  updated_at: {
                    type: 'string',
                    format: 'date-time',
                  },
                  user: {
                    $schema: 'http://json-schema.org/draft-04/schema#',
                    title: 'User',
                    type: 'object',
                    properties: {
                      name: {
                        type: 'string',
                        description: "The user's full name.",
                      },
                      age: {
                        type: 'number',
                        minimum: 0,
                        maximum: 150,
                      },
                    },
                    required: ['name', 'age'],
                    'x-tags': ['Todos'],
                    description: 'Here lies the user model',
                  },
                },
                required: ['id', 'user'],
              },
            ],
            'x-tags': ['Todos'],
          },
          examples: [
            {
              key: 'application/json',
              value: {
                id: 9000,
                name: "It's Over 9000!!!",
                completed: true,
                completed_at: null,
                created_at: '2014-08-28T14:14:28.494Z',
                updated_at: '2015-08-28T14:14:28.494Z',
              },
            },
          ],
        },
      ],
    },
    {
      code: '401',
      description: 'Our shared 401 response.',
      headers: [],
      contents: [
        {
          mediaType: 'application/json',
          schema: {
            $schema: 'http://json-schema.org/draft-04/schema#',
            title: 'Error',
            description: 'A standard error object.',
            'x-tags': ['Common'],
            anyOf: [
              {
                type: 'object',
                properties: {
                  code: {
                    type: 'string',
                  },
                  message: {
                    type: 'string',
                  },
                },
                required: ['code'],
              },
              {
                $schema: 'http://json-schema.org/draft-04/schema#',
                title: 'Category',
                type: 'object',
                description: '',
                properties: {
                  name: {
                    type: 'string',
                  },
                },
                required: ['name'],
                'x-tags': ['Pets'],
              },
            ],
          },
          examples: [
            {
              key: 'application/json',
              value: {
                code: '401',
                message: 'Not Authorized',
              },
            },
          ],
        },
      ],
    },
    {
      code: '404',
      description: 'Our shared 404 response.',
      headers: [],
      contents: [
        {
          mediaType: 'application/json',
          schema: {
            $schema: 'http://json-schema.org/draft-04/schema#',
            title: 'Error',
            description: 'A standard error object.',
            'x-tags': ['Common'],
            anyOf: [
              {
                type: 'object',
                properties: {
                  code: {
                    type: 'string',
                  },
                  message: {
                    type: 'string',
                  },
                },
                required: ['code'],
              },
              {
                $schema: 'http://json-schema.org/draft-04/schema#',
                title: 'Category',
                type: 'object',
                description: '',
                properties: {
                  name: {
                    type: 'string',
                  },
                },
                required: ['name'],
                'x-tags': ['Pets'],
              },
            ],
          },
          examples: [
            {
              key: 'application/json',
              value: {
                code: '404',
                message: 'Not Found',
              },
            },
          ],
        },
      ],
    },
    {
      code: '500',
      description: 'Our shared 500 response.',
      headers: [],
      contents: [
        {
          mediaType: 'application/json',
          schema: {
            $schema: 'http://json-schema.org/draft-04/schema#',
            title: 'Error',
            description: 'A standard error object.',
            'x-tags': ['Common'],
            anyOf: [
              {
                type: 'object',
                properties: {
                  code: {
                    type: 'string',
                  },
                  message: {
                    type: 'string',
                  },
                },
                required: ['code'],
              },
              {
                $schema: 'http://json-schema.org/draft-04/schema#',
                title: 'Category',
                type: 'object',
                description: '',
                properties: {
                  name: {
                    type: 'string',
                  },
                },
                required: ['name'],
                'x-tags': ['Pets'],
              },
            ],
          },
          examples: [
            {
              key: 'application/json',
              value: {
                code: '500',
                message: 'Server Error',
              },
            },
          ],
        },
      ],
    },
  ],
  servers: [
    {
      url: 'http://todos.stoplight.io',
    },
  ],
  request: {
    body: {
      contents: [
        {
          mediaType: 'application/json',
          schema: {
            $schema: 'http://json-schema.org/draft-04/schema#',
            title: 'Todo Partial',
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
              completed: {
                type: ['boolean', 'null'],
              },
            },
            required: ['name', 'completed'],
            'x-tags': ['Todos'],
          },
          examples: [
            {
              key: 'Incomplete',
              value: {
                name: 'Docs Module',
                completed: false,
              },
            },
            {
              key: 'Completed',
              value: {
                name: 'Studio',
                completed: true,
              },
            },
          ],
        },
      ],
    },
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
      {
        schema: {
          type: 'boolean',
          description: 'Only return completed',
        },
        name: 'completed',
        style: HttpParamStyles.Form,
      },
      {
        schema: {
          type: 'string',
          enum: ['something', 'another'],
        },
        name: 'type',
        style: HttpParamStyles.Form,
      },
    ],
    headers: [
      {
        schema: {
          type: 'string',
          description: 'Your Stoplight account id',
        },
        name: 'account-id',
        style: HttpParamStyles.Simple,
        required: true,
      },
    ],
    path: [
      {
        schema: {
          type: 'string',
        },
        name: 'todoId',
        style: HttpParamStyles.Simple,
        required: true,
      },
    ],
  },
  tags: [
    {
      name: 'Todos',
    },
  ],
  security: [
    [
      {
        key: 'api_key',
        type: 'apiKey',
        name: 'API Key',
        in: 'query',
        description: "Use `?apikey=123` to authenticate requests. It's super secure.",
      },
    ],
    [
      {
        key: 'basicKey',
        type: 'http',
        scheme: 'basic',
        description:
          'Get access to data while protecting your account credentials. OAuth2 is also a safer and more secure way to give you access.',
      },
    ],
    [
      {
        key: 'bearerKey',
        type: 'http',
        scheme: 'bearer',
        description:
          'Get access to data while protecting your account credentials. OAuth2 is also a safer and more secure way to give you access.',
        bearerFormat: 'Authorization',
      },
    ],
    [
      {
        key: 'openIdConnectKey',
        type: 'openIdConnect',
        description:
          'Get access to data while protecting your account credentials. OAuth2 is also a safer and more secure way to give you access.',
        openIdConnectUrl: 'http://openIdConnect.com',
      },
    ],
    [
      {
        key: 'oauth2Key',
        type: 'oauth2',
        description:
          'Get access to data while protecting your account credentials. OAuth2 is also a safer and more secure way to give you access.',
        flows: {
          implicit: {
            scopes: {
              'write:pets': 'modify pets in your account',
              'read:pets': 'read your pets',
            },
            refreshUrl: 'http://refreshUrl.com',
            authorizationUrl: 'http://authorizationUrl.com',
          },
          password: {
            scopes: {
              'write:pets': 'modify pets in your account',
              'read:pets': 'read your pets',
            },
            refreshUrl: 'http://refreshUrl.com',
            tokenUrl: 'http://tokenUrl.com',
          },
          clientCredentials: {
            scopes: {
              'write:pets': 'modify pets in your account',
              'read:pets': 'read your pets',
            },
            refreshUrl: 'http://refreshUrl.com',
            tokenUrl: 'http://tokenUrl.com',
          },
          authorizationCode: {
            scopes: {
              'write:pets': 'modify pets in your account',
              'read:pets': 'read your pets',
            },
            refreshUrl: 'http://refreshUrl.com',
            tokenUrl: 'http://tokenUrl.com',
            authorizationUrl: 'http://authorizationUrl.com',
          },
        },
      },
    ],
  ],
};

export default httpOperation;
