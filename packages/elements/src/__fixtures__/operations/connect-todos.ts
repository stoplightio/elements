import { IHttpOperation } from '@stoplight/types';

export const connectWithRequestBody: IHttpOperation = {
  id: '?http-operation-id?',
  iid: 'CONNECT_USERS',
  method: 'CONNECT',
  path: '/users',
  summary: 'Connect Users',
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

export default connectWithRequestBody;
