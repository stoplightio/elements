import { IHttpOperation } from '@stoplight/types';

export const httpOperation: IHttpOperation = {
  id: '?http-operation-id?',
  iid: 'GET todos',
  method: 'get',
  path: '/todos',
  summary: 'List todos',
  responses: [],
  security: [
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
  ],
};

export default httpOperation;
