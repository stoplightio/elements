import { IHttpOperation } from '@stoplight/types';

export const requestBody: IHttpOperation = {
  id: '?http-operation-id?',
  iid: 'POST_USERS',
  method: 'POST',
  path: '/users',
  summary: 'Post Users',
  responses: [
    {
      id: '?http-response-200?',
      code: '200',
    },
  ],
  servers: [
    {
      id: '?http-server-todos.stoplight.io?',
      url: 'https://todos.stoplight.io',
    },
  ],
  request: {
    body: {
      id: '?http-request-body?',
      contents: [
        {
          id: '?http-media-0?',
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
        {
          id: '?http-media-1?',
          mediaType: 'application/x-www-form-urlencoded',
          schema: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              completed: { type: 'boolean' },
              someEnum: { type: 'string', enum: ['a', 'b', 'c'] },
            },
            required: ['name', 'completed', 'someEnum'],
          },
        },
      ],
    },
  },
};

export default requestBody;
