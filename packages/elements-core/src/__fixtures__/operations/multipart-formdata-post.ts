import { IHttpOperation } from '@stoplight/types';

export const httpOperation: IHttpOperation = {
  id: '?http-operation-id?',
  iid: 'POST_todos',
  method: 'post',
  path: '/todos',
  summary: 'Create Todo',
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
          mediaType: 'multipart/form-data',
          schema: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
              age: {
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
              someFile: {
                type: 'string',
                contentMediaType: 'application/octet-stream',
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
