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
          id: '493afac014fa8',
          mediaType: 'application/x-www-form-urlencoded',
          examples: [
            {
              id: '83adf9aba208e',
              key: 'Request New Token',
              value: {
                username: 'Neovest provided username',
                password: 'corresponding password',
              },
            },
            {
              id: '9dcf9cf7d39ea',
              key: 'Refresh Token',
              value: {
                refresh_token: 'some string',
              },
            },
          ],
          encodings: [],
          schema: {
            oneOf: [
              {
                title: 'Authenticate',
                description: 'supply username and password for refresh and access tokens',
                type: 'object',
                properties: {
                  username: { type: 'string' },
                  password: { type: 'string' },
                },
              },
              {
                title: 'Access Token Refresh',
                description: 'supply a refresh token for new refresh and access tokens',
                type: 'object',
                properties: {
                  refresh_token: { type: 'string' },
                },
              },
            ],
            'x-stoplight': {
              id: 'fy4lgsesqt84g',
            },
            'x-internal': false,
            description: '',
            title: 'Request Body Schemas',
            $schema: 'http://json-schema.org/draft-07/schema#',
          },
        },
      ],
    },
  },
};

export default httpOperation;
