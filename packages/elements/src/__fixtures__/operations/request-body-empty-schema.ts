import { IHttpOperation } from '@stoplight/types';

export const requestBodyEmptySchema: IHttpOperation = {
  id: '?http-operation-id?',
  iid: 'POST_USERS',
  method: 'POST',
  path: '/users',
  summary: 'Post Users',
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
          schema: {},
        },
      ],
    },
  },
};

export default requestBodyEmptySchema;
