import { IHttpOperation } from '@stoplight/types';

export const headWithRequestBody: IHttpOperation = {
  id: '?http-operation-id?',
  iid: 'HEAD_USERS',
  method: 'HEAD',
  path: '/users',
  summary: 'Head Users',
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
      ],
    },
  },
};

export default headWithRequestBody;
