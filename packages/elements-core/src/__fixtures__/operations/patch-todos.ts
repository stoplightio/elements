import { IHttpOperation } from '@stoplight/types';

export const patchWithRequestBody: IHttpOperation = {
  id: '?http-operation-id?',
  iid: 'PATCH_USERS',
  method: 'PATCH',
  path: '/users',
  summary: 'Patch Users',
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

export default patchWithRequestBody;
