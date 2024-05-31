import { HttpOperationSecurityDeclarationTypes, HttpParamStyles, IHttpOperation } from '@stoplight/types';

export const httpOperation: IHttpOperation = {
  id: '?http-operation-id?',
  iid: 'PUT_todos',
  method: 'put',
  path: '/todos/{todoId}',
  summary: 'Update Todo',
  extensions: {
    'x-stoplight-info': {
      id: 'http-operation-id',
      version: '1.0.0',
    },
  },
  responses: [
    {
      id: '?http-response-200?',
      code: '200',
      description: 'It worked!',
      headers: [
        {
          id: '?http-header-X-Stoplight-Resolver?',
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
          id: '?http-media-0?',
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
                      plan: {
                        enum: ['FREE', 'BASIC', 'DELUXE'],
                        // @ts-ignore
                        'x-enum-descriptions': {
                          FREE: 'A happy customer',
                          BASIC: 'Just what is needed',
                          DELUXE: 'Big bucks',
                        },
                      },
                    },
                    required: ['name', 'age'],
                    description: 'Here lies the user model',
                  },
                  type: {
                    description: 'The type of todo',
                    type: 'string',
                    enum: ['REMINDER', 'TASK'],
                    // @ts-ignore
                    'x-enum-descriptions': {
                      REMINDER: 'A reminder',
                      TASK: 'A task',
                    },
                  },
                },
                required: ['id', 'user'],
              },
            ],
          },
        },
        {
          id: '?http-media-1?',
          mediaType: 'application/xml',
        },
        {
          id: '?http-media-2?',
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
      id: '?http-response-401?',
      code: '401',
      description: 'Our shared 401 response.',
      headers: [],
      contents: [
        {
          id: '?http-media-1?',
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
              id: '?http-example-8?',
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
      id: '?http-response-404?',
      code: '404',
      description: 'Our shared 404 response.',
      headers: [],
      contents: [
        {
          id: '?http-media-10?',
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
              id: '?http-example-10?',
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
      id: '?http-response-500?',
      code: '500',
      description: 'Our shared 500 response.',
      headers: [],
      contents: [
        {
          id: '?http-media-11?',
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
              id: '?http-example-11?',
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
      id: '?http-server-todos.stoplight.io?',
      url: 'https://todos.stoplight.io',
    },
    {
      id: '?http-server-todos-dev.stoplight.io?',
      description: 'Development',
      url: 'https://todos-dev.stoplight.io',
    },
    {
      id: '?http-server-todos-pr.stoplight.io?',
      description: 'PR',
      url: '{proto}://x-{pr}.todos-pr.stoplight.io:{port}',
      variables: {
        proto: {
          default: 'http',
          enum: ['http', 'https'],
        },
        pr: {
          default: '1000',
        },
        port: {
          default: '80',
          enum: ['443', '80'],
        },
      },
    },
  ],
  request: {
    body: {
      id: '?http-request-body?',
      description: 'Some body description',
      contents: [
        {
          id: '?http-media-4?',
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
              id: '?http-example-0?',
              key: 'Incomplete',
              value: {
                name: 'Docs Module',
                completed: false,
              },
            },
            {
              id: '?http-example-1?',
              key: 'Completed',
              value: {
                name: 'Studio',
                completed: true,
              },
            },
          ],
        },
        {
          id: '?http-media-5?',
          mediaType: 'application/xml',
        },
      ],
    },
    query: [
      {
        id: '?http-query-limit?',
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
        id: '?http-query-value?',
        schema: {
          type: 'string',
          default: '1',
          enum: ['0', '1', '3'],
          minLength: 0,
          maxLength: 10,
        },
        examples: [{ id: '?http-example-2?', key: 'Example', value: '3' }],
        deprecated: true,
        description: 'How many string todos to limit?',
        name: 'value',
        required: true,
        style: HttpParamStyles.Form,
      },
      {
        id: '?http-query-pairs?',
        schema: {
          type: 'object',
        },
        name: 'pairs',
        style: HttpParamStyles.Form,
      },
      {
        id: '?http-query-items?',
        schema: {
          type: 'array',
          minItems: 5,
          maxItems: 10,
        },
        name: 'items',
        style: HttpParamStyles.Form,
      },
      {
        id: '?http-query-completed?',
        schema: {
          type: 'boolean',
          description: 'Only return completed',
        },
        name: 'completed',
        style: HttpParamStyles.Form,
      },
      {
        id: '?http-query-type?',
        schema: {
          type: 'string',
          enum: ['something', 'another'],
        },
        name: 'type',
        required: true,
        style: HttpParamStyles.SpaceDelimited,
      },
      {
        id: '?http-query-super_duper_long_parameter_name_with_unnecessary_text?',
        name: 'super_duper_long_parameter_name_with_unnecessary_text',
        schema: {
          type: 'string',
          default: 'some interesting string with interesting content, but still pretty long',
        },
        style: HttpParamStyles.Form,
      },
      {
        id: '?http-query-optional_value_with_default?',
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
        id: '?http-header-account-id?',
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
            id: '?http-example-3?',
            value: 'example id',
            key: 'example',
          },
        ],
      },
      {
        id: '?http-header-message-id?',
        schema: {
          type: 'string',
          description: 'Your Stoplight account id',
        },
        name: 'message-id',
        style: HttpParamStyles.Simple,
        required: true,
        examples: [
          {
            id: '?http-example-4?',
            value: 'example value',
            key: 'example 1',
          },
          {
            id: '?http-example-5?',
            value: 'another example',
            key: 'example 2',
          },
          {
            id: '?http-example-6?',
            value: 'something else',
            key: 'example 3',
          },
        ],
      },
      {
        id: '?http-header-optional_header?',
        name: 'optional_header',
        schema: {
          type: 'string',
        },
        style: HttpParamStyles.Simple,
      },
      {
        id: '?http-header-quote?',
        schema: {
          type: 'string',
          description: 'Quote or no quote',
        },
        name: 'quote',
        style: HttpParamStyles.Simple,
        examples: [
          {
            id: '?http-example-6?',
            value: '',
            key: 'no quote',
          },
          {
            id: '?http-example-7?',
            value: '"',
            key: 'quote',
          },
        ],
      },
    ],
    path: [
      {
        id: '?http-path-param-todoId?',
        schema: {
          type: 'string',
        },
        name: 'todoId',
        style: HttpParamStyles.Simple,
        required: true,
      },
    ],
  },
  callbacks: [
    {
      key: 'newPet',
      extensions: {},
      id: '3245690b6a7fc',
      method: 'post',
      path: '{$request.body#/newPetAvailableUrl}',
      request: {
        body: {
          description: 'Callback body description',
          contents: [
            {
              encodings: [],
              examples: [],
              id: 'abc',
              mediaType: 'application/json',
              schema: {
                $schema: 'http://json-schema.org/draft-07/schema#',
                properties: {
                  message: {
                    examples: ['A new pet has arrived'],
                    type: 'string',
                  },
                },
                required: ['message'],
                type: 'object',
              },
            },
          ],
          id: 'abc',
          required: true,
        },
        cookie: [],
        headers: [],
        path: [],
        query: [],
      },
      responses: [
        {
          code: '200',
          contents: [],
          description: 'Your server returns this code if it accepts the callback',
          headers: [],
          id: 'abc',
        },
      ],
      security: [],
      securityDeclarationType: HttpOperationSecurityDeclarationTypes.InheritedFromService,
      servers: [],
      tags: [],
    },
    {
      key: 'returnedPet',
      extensions: {},
      id: '07041d5723f4a',
      method: 'post',
      path: '{$request.body#/returnedPetAvailableUrl}',
      request: {
        body: {
          contents: [
            {
              encodings: [],
              examples: [],
              id: 'abc',
              mediaType: 'application/json',
              schema: {
                $schema: 'http://json-schema.org/draft-07/schema#',
                properties: {
                  message: {
                    examples: ['A pet has been returned'],
                    type: 'string',
                  },
                },
                required: ['message'],
                type: 'object',
              },
            },
          ],
          id: 'abc',
          required: true,
        },
        cookie: [],
        headers: [],
        path: [],
        query: [],
      },
      responses: [
        {
          code: '200',
          contents: [],
          description: 'Your server returns this code if it accepts the callback',
          headers: [],
          id: 'abc',
        },
      ],
      security: [],
      securityDeclarationType: HttpOperationSecurityDeclarationTypes.InheritedFromService,
      servers: [],
      tags: [],
    },
  ],
  tags: [
    {
      id: '?http-tags-todos?',
      name: 'Todos',
    },
  ],
  security: [
    [
      {
        id: '?http-security-api_key?',
        key: 'api_key',
        type: 'apiKey',
        name: 'API Key',
        in: 'query',
        description: "Use `?apikey=123` to authenticate requests. It's super secure.",
      },
    ],
    [
      {
        id: '?http-security-api_key2?',
        key: 'api_key2',
        type: 'apiKey',
        name: 'API Key 2',
        in: 'query',
        description: "Use `?apikey2=456` to authenticate requests. It's super secure.",
      },
    ],
    [
      {
        id: '?http-security-basicKey?',
        key: 'basicKey',
        type: 'http',
        scheme: 'basic',
        description:
          'Get access to data while protecting your account credentials. OAuth2 is also a safer and more secure way to give you access.',
      },
    ],
    [
      {
        id: '?http-security-bearerKey?',
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
        id: '?http-security-digest?',
        key: 'digest',
        type: 'http',
        scheme: 'digest',
        description: 'Digest is cool. Use digest. No questions asked money back guarantee.',
      },
    ],
    [
      {
        id: '?http-security-api_key?',
        key: 'api_key',
        type: 'apiKey',
        name: 'API Key',
        in: 'query',
        description: "Use `?apikey=123` to authenticate requests. It's super secure.",
      },
      {
        id: '?http-security-api_key2?',
        key: 'api_key2',
        type: 'apiKey',
        name: 'Alternate API key',
        in: 'query',
        description: "Use `?apikey=123` to authenticate requests. It's super secure.",
      },
    ],
    [
      {
        id: '?http-security-openIdConnectKey?',
        key: 'openIdConnectKey',
        type: 'openIdConnect',
        description:
          'Get access to data while protecting your account credentials. OAuth2 is also a safer and more secure way to give you access.',
        openIdConnectUrl: 'http://openIdConnect.com',
      },
    ],
    [],
    [
      {
        id: '?http-security-oauth2Key?',
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
      {
        id: '?http-security-api_key?',
        key: 'api_key',
        type: 'apiKey',
        name: 'API Key',
        in: 'query',
        description: "Use `?apikey=123` to authenticate requests. It's super secure.",
      },
    ],
    [
      {
        id: '?http-security-oauth2Key?',
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
    [
      {
        id: '?http-security-api_key2?',
        key: 'api_key2',
        type: 'apiKey',
        name: 'API Key 2',
        in: 'query',
        description: "Use `?apikey2=456` to authenticate requests. It's super secure.",
      },
      {
        id: '?http-security-basicKey?',
        key: 'basicKey',
        type: 'http',
        scheme: 'basic',
        description:
          'Get access to data while protecting your account credentials. OAuth2 is also a safer and more secure way to give you access.',
      },
    ],
  ],
};

export default httpOperation;
