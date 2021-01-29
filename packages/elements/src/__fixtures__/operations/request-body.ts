import { IHttpOperation } from '@stoplight/types';

export const requestBody: IHttpOperation = {
  id: '?http-operation-id?',
  iid: 'GET_USERS',
  method: 'get',
  path: '/users',
  summary: 'Get Users',
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

export default requestBody;
