import { HttpParamStyles, IHttpOperation } from '@stoplight/types';

export const singleSecurityOperation: IHttpOperation = {
  id: '?http-operation-id?',
  iid: 'GET-simple',
  method: 'get',
  path: '/todos',
  summary: 'Get 200',
  responses: [
    {
      code: '200',
      description: 'OK',
    },
  ],
  servers: [{ url: 'https://todos.stoplight.io' }],
  security: [
    [
      {
        key: 'api_key',
        type: 'apiKey',
        name: 'API-Key',
        in: 'header',
        description: "Use `?apikey=123` to authenticate requests. It's super secure.",
      },
    ],
  ],
};

export const emptySecurityOperation: IHttpOperation = {
  id: '?http-operation-id?',
  iid: 'GET-simple',
  method: 'get',
  path: '/todos',
  summary: 'Get 200',
  responses: [
    {
      code: '200',
      description: 'OK',
    },
  ],
  servers: [{ url: 'https://todos.stoplight.io' }],
  security: [[]],
};

export const duplicatedSecurityScheme: IHttpOperation = {
  id: '?http-operation-id?',
  iid: 'GET-simple',
  method: 'get',
  path: '/todos',
  summary: 'Get 200',
  responses: [
    {
      code: '200',
      description: 'OK',
    },
  ],
  servers: [{ url: 'https://todos.stoplight.io' }],
  security: [
    [
      {
        key: 'api_key',
        type: 'apiKey',
        name: 'API-Key',
        in: 'query',
        description: "Use `?apikey=123` to authenticate requests. It's super secure.",
      },
      {
        type: 'oauth2',
        key: 'oauth2',
        flows: {},
      },
    ],
  ],
  request: {
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
        name: 'api-key',
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
        name: 'Api-KeY',
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
        name: 'authorization',
        style: HttpParamStyles.Simple,
        schema: {
          type: 'string',
        },
      },
    ],
  },
};
