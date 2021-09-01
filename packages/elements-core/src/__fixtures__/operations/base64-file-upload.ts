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
              someFile: {
                type: 'string',
                contentEncoding: 'base64',
              },
            },
          },
        },
      ],
    },
  },
};

export default httpOperation;
