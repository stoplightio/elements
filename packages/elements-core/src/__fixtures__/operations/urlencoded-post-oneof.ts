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
          encodings: [],
          schema: {
            description: '',
            title: 'Authenticate or Refresh',
            $schema: 'http://json-schema.org/draft-07/schema#',
            oneOf: [
              {
                title: 'Authenticate',
                description: 'supply username and password for refresh and access tokens',
                allOf: [
                  {
                    type: 'object',
                    properties: {
                      username: { type: 'string' },
                      password: { type: 'string' },
                    },
                  },
                  {
                    type: 'object',
                    properties: {
                      client_id: { type: 'string' },
                      client_secret: { type: 'string' },
                    },
                  },
                ],
              },
              {
                title: 'Access Token Refresh',
                description: 'supply a refresh token for new refresh and access tokens',
                allOf: [
                  {
                    type: 'object',
                    properties: {
                      refresh_token: { type: 'string' },
                    },
                  },
                  {
                    type: 'object',
                    properties: {
                      client_id: { type: 'string' },
                      client_secret: { type: 'string' },
                    },
                  },
                ],
              },
            ],
          },
        },
      ],
    },
  },
};

export default httpOperation;
