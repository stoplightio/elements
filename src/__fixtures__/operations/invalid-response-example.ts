import { HttpParamStyles, IHttpOperation } from '@stoplight/types';

export const invalidOperation: IHttpOperation = {
  id: '?http-operation-id?',
  iid: 'GET_dummy',
  method: 'get',
  path: '/invalid-response',
  summary: 'Get dummy invalid response',
  responses: [
    {
      code: '200',
      description: 'Invalid body and headers',
      headers: [
        {
          name: 'sl-results',
          required: true,
          style: HttpParamStyles.Simple,
          schema: {
            type: 'string',
            pattern: 'X-*$',
          },
          examples: [{ key: 'example1', value: 'hello' }],
        },
      ],
      contents: [
        {
          mediaType: 'application/json',
          examples: [{ key: 'example1', value: {} }],
          schema: {
            type: 'object',
            required: ['name', 'surname', 'age'],
            properties: {
              name: { type: 'string' },
              surname: { type: 'string' },
              age: { type: 'number' },
            },
          },
        },
      ],
    },
  ],
};
