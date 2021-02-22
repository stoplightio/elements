import { IHttpOperation } from '@stoplight/types';

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
        name: 'API Key',
        in: 'query',
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
