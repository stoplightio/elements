import { HttpParamStyles, IHttpOperation } from '@stoplight/types';

export const httpOperation: IHttpOperation = {
  id: '?http-operation-id?',
  iid: 'PUT_todos',
  method: 'put',
  path: '/todos/{todoId}',
  summary: 'Update Todo',
  responses: [
    {
      code: '200',
      description: 'It worked!',
      headers: [
        {
          schema: {
            type: 'string',
            description: 'Resolver errors.',
          },
          name: 'X-Stoplight-Resolver',
          style: HttpParamStyles.Simple,
          required: true,
        },
      ],
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
                    description: 'Here lies the user model',
                  },
                },
                required: ['id', 'user'],
              },
            ],
          },
        },
        {
          mediaType: 'application/xml',
        },
        {
          mediaType: 'application/yaml',
          schema: {
            properties: {
              some_number: {
                type: 'number',
              },
              some_string: {
                type: 'string',
              },
            },
          },
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
      url: 'https://todos.stoplight.io',
    },
    {
      description: 'Development',
      url: 'https://todos-dev.stoplight.io',
    },
  ],
  request: {
    body: {
      description: 'Some body description',
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
        {
          mediaType: 'application/xml',
        },
      ],
    },
    query: [
      {
        schema: {
          type: 'number',
          default: 1,
          enum: [0, 1, 3],
          exclusiveMinimum: 0,
          exclusiveMaximum: 10,
          minimum: 5,
          maximum: 10,
        },
        deprecated: true,
        description: 'How many todos to limit?',
        name: 'limit',
        style: HttpParamStyles.Form,
      },
      {
        schema: {
          type: 'string',
          default: '1',
          enum: ['0', '1', '3'],
          minLength: 0,
          maxLength: 10,
        },
        deprecated: true,
        description: 'How many string todos to limit?',
        name: 'value',
        required: true,
        style: HttpParamStyles.Form,
      },
      {
        schema: {
          type: 'array',
          minItems: 5,
          maxItems: 10,
        },
        name: 'items',
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
        required: true,
        style: HttpParamStyles.SpaceDelimited,
      },
      {
        name: 'super_duper_long_parameter_name_with_unnecessary_text',
        schema: {
          type: 'string',
          default: 'some interesting string with interesting content, but still pretty long',
        },
        style: HttpParamStyles.Form,
      },
      {
        name: 'optional_value_with_default',
        schema: {
          type: 'string',
          default: 'some default value',
        },
        style: HttpParamStyles.Form,
      },
    ],
    headers: [
      {
        schema: {
          type: 'string',
          description: 'Your Stoplight account id',
          default: 'account-id-default',
        },
        name: 'account-id',
        style: HttpParamStyles.Simple,
        required: true,
        examples: [
          {
            value: 'example id',
            key: 'example',
          },
        ],
      },
      {
        schema: {
          type: 'string',
          description: 'Your Stoplight account id',
        },
        name: 'message-id',
        style: HttpParamStyles.Simple,
        required: true,
        examples: [
          {
            value: 'example value',
            key: 'example 1',
          },
          {
            value: 'another example',
            key: 'example 2',
          },
          {
            value: 'something else',
            key: 'example 3',
          },
        ],
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
        key: 'digest',
        type: 'http',
        scheme: 'digest',
        description: 'Digest is cool. Use digest. No questions asked money back guarantee.',
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
