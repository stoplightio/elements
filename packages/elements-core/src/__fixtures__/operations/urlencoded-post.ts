import { IHttpOperation } from '@stoplight/types';

export const httpOperation: IHttpOperation = {
  id: '?http-operation-id?',
  iid: 'POST_todos',
  method: 'post',
  path: '/todos',
  summary: 'Create Todo',
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
          mediaType: 'application/x-www-form-urlencoded',
          schema: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
              completed: {
                type: 'boolean',
              },
              someRequiredEnum: {
                type: 'string',
                enum: ['a', 'b', 'c'],
              },
              someOptionalEnum: {
                type: 'string',
                enum: ['a', 'b', 'c'],
              },
            },
            required: ['name', 'completed', 'someRequiredEnum'],
          },
        },
      ],
    },
  },
};

export default httpOperation;
