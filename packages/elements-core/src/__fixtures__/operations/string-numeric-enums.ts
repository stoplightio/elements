import { HttpParamStyles, IHttpOperation } from '@stoplight/types';

export const httpOperation: IHttpOperation = {
  id: '?http-operation-id?',
  iid: 'GET_enums',
  method: 'get',
  path: '/enums',
  summary: 'Get enums',
  responses: [
    {
      code: '204',
      description: 'OK',
    },
  ],
  request: {
    query: [
      {
        schema: {
          type: 'string',
          enum: ['00', '06', '12', '18'],
        },
        name: 'cycle',
        required: true,
        style: HttpParamStyles.Form,
      },
    ],
  },
};

export default httpOperation;
