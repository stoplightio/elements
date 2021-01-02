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
          mediaType: 'multipart/form-data',
          schema: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
              completed: {
                type: 'boolean',
              },
              someEnum: {
                type: 'string',
                enum: ['a', 'b', 'c'],
              },
            },
            required: ['name', 'completed'],
          },
        },
      ],
    },
  },
};

export default httpOperation;
