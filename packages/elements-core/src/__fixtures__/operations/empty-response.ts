import { IHttpOperation } from '@stoplight/types';

export const operation: any = {
  id: '?http-operation-id?',
  iid: 'GET_dummy',
  method: 'get',
  path: '/dummy',
  summary: 'Get dummy empty response',
  responses: [
    {
      code: '204',
      description: 'Invalid status value',
    },
  ],
};
