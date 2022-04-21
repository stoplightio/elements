import { IHttpOperation } from '@stoplight/types';

export const operation: IHttpOperation = {
  id: '?http-operation-id?',
  iid: 'GET-simple',
  method: 'get',
  path: '/todos',
  summary: 'Get 200',
  responses: [
    {
      id: '?http-response-200?',
      code: '200',
      description: 'OK',
    },
  ],
  servers: [{ id: '?http-server-0?', url: 'https://todos.stoplight.io' }],
};
