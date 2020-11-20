import { HttpMethod, HttpParamStyles, IHttpOperation, IHttpRequest } from '@stoplight/types';

export const request: IHttpRequest = {
  baseUrl: 'https://test.com',
  method: 'put' as HttpMethod,
  url: '/test',
  headers: {},
  query: {
    queryParamName: ['queryParamValue'],
  },
  body: '',
};

export const operation: IHttpOperation = {
  id: '1',
  method: 'post',
  path: '/operationResource',
  request: {
    path: [],
    query: [
      {
        name: 'queryParamName',
        style: HttpParamStyles.Form,
        required: true,
      },
    ],
    headers: [],
    cookie: [],
    body: {
      contents: [],
    },
  },
  responses: [
    {
      code: '200',
      contents: [
        {
          mediaType: 'application/json',
          examples: [
            {
              key: 'first-example',
              description: 'First example',
              value: {
                exampleName: 'first',
              },
            },
            {
              key: 'second-example',
              description: 'Second example',
              value: {
                exampleName: 'second',
              },
            },
          ],
        },
      ],
      headers: [],
    },
    {
      code: '400',
      contents: [],
      headers: [],
    },
    {
      code: 'default',
      contents: [],
      headers: [],
    },
  ],
  servers: [
    {
      url: 'http://localhost:9001',
    },
  ],
  security: [],
};
