import { IHttpOperation } from '@stoplight/types';

export const invalidOperation: IHttpOperation = {
  id: '?http-operation-id?',
  iid: 'GET_dummy',
  method: 'get',
  path: '/dummy',
  summary: 'Get dummy empty response',
  responses: [
    {
      code: '204',
      description: 'Invalid example',
      contents: [
        {
          mediaType: 'application/json',
          examples: [{ key: 'example1', value: { name: 'Clark' } }],
          schema: {
            type: 'object',
            required: ['name', 'surname'],
            properties: {
              name: { type: 'string' },
              surname: { type: 'string' },
            },
          },
        },
      ],
    },
  ],
};
