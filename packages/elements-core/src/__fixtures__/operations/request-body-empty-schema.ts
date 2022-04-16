import { IHttpOperation } from '@stoplight/types';

export const requestBodyEmptySchema: IHttpOperation = {
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
          schema: {},
        },
      ],
    },
  },
};

export default requestBodyEmptySchema;
