import { HttpParamStyles, IHttpOperation } from '@stoplight/types';

export const invalidOperation: IHttpOperation = {
  id: '?http-operation-id?',
  iid: 'GET_dummy',
  method: 'get',
  path: '/invalid-response',
  summary: 'Get dummy invalid response',
  responses: [
    {
      id: '?http-response-200?',
      code: '200',
      description: 'Invalid body and headers',
      headers: [
        {
          id: '?http-header-sl-results?',
          name: 'sl-results',
          required: true,
          style: HttpParamStyles.Simple,
          schema: {
            type: 'string',
            pattern: 'X-*$',
          },
          examples: [{ id: '?http-example-0?', key: 'example1', value: 'hello' }],
        },
      ],
      contents: [
        {
          id: '?http-media-0?',
          mediaType: 'application/json',
          examples: [{ id: '?http-example-1?', key: 'example1', value: {} }],
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
