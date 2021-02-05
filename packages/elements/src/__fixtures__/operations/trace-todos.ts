import { IHttpOperation } from '@stoplight/types';

export const traceWithRequestBody: IHttpOperation = {
  id: '?http-operation-id?',
  iid: 'TRACE_USERS',
  method: 'TRACE',
  path: '/users',
  summary: 'Trace Users',
  responses: [
    {
      code: '200',
    },
  ],
  servers: [
    {
      url: 'https://todos.stoplight.io',
    },
  ],
  request: {
    body: {
      contents: [
        {
          mediaType: 'application/json',
          schema: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
              age: {
                type: 'number',
              },
              trial: {
                type: 'boolean',
                readOnly: true,
              },
            },
          },
        },
      ],
    },
  },
};

export default traceWithRequestBody;
