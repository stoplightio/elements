import { IHttpOperation } from '@stoplight/types';

export const operation: IHttpOperation = {
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
};
