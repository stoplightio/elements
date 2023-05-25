import { IHttpOperation } from '@stoplight/types';

export const httpOperation: IHttpOperation = {
  id: '?http-operation-id?',
  iid: 'GET token',
  method: 'get',
  path: '/token',
  summary: 'Get Token',
  responses: [],
  security: [
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
  ],
};

export default httpOperation;
