import { IHttpOperation } from '@stoplight/types';

export const examplesRequestBody: IHttpOperation = {
  id: '?http-operation-id?',
  iid: 'PUT_USERS',
  method: 'put',
  path: '/users',
  summary: 'Put Users',
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
          examples: [
            {
              key: 'example-1',
              value: {
                name: 'Andrew',
                age: 19,
                trial: true,
              },
            },
            {
              key: 'named example',
              value: {
                name: 'Jane',
                age: 36,
                trial: false,
              },
            },
            {
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
          examples: [
            {
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
