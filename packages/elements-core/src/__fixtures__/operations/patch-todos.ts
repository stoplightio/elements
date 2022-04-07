import { IHttpOperation } from '@stoplight/types';

export const patchWithRequestBody: IHttpOperation = {
  id: '?http-operation-id?',
  iid: 'PATCH_USERS',
  method: 'PATCH',
  path: '/users',
  summary: 'Patch Users',
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
          id: '?http-request-body-media?',
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

export default patchWithRequestBody;
