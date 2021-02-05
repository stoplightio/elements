import { IHttpOperation } from '@stoplight/types';

export const headWithRequestBody: IHttpOperation = {
  id: '?http-operation-id?',
  iid: 'HEAD_USERS',
  method: 'HEAD',
  path: '/users',
  summary: 'Head Users',
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

export default headWithRequestBody;
