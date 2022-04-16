import { IHttpOperation } from '@stoplight/types';

export const examplesRequestBody: IHttpOperation = {
  id: '?http-operation-id?',
  iid: 'PUT_USERS',
  method: 'put',
  path: '/users',
  summary: 'Put Users',
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
          examples: [
            {
              id: '?http-example-example-1?',
              key: 'example-1',
              value: {
                name: 'Andrew',
                age: 19,
                trial: true,
              },
            },
            {
              id: '?http-example-named-example?',
              key: 'named example',
              value: {
                name: 'Jane',
                age: 36,
                trial: false,
              },
            },
            {
              id: '?http-example-named-example-3?',
              key: 'example-3',
              value: {
                name: 'Max',
                age: 23,
                trial: true,
              },
            },
          ],
        },
      ],
    },
  },
};

export const singleExampleRequestBody: IHttpOperation = {
  id: '?http-operation-id?',
  iid: 'PUT_USERS',
  method: 'put',
  path: '/users',
  summary: 'Put Users',
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
          examples: [
            {
              id: '?http-example-example-1?',
              key: 'example-1',
              value: {
                name: 'Andrew',
                age: 19,
                trial: true,
              },
            },
          ],
        },
      ],
    },
  },
};

export default examplesRequestBody;
