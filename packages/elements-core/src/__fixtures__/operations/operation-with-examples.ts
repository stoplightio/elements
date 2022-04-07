import { IHttpOperation } from '@stoplight/types';

export const httpOperation: IHttpOperation = {
  method: 'GET',
  path: 'some/path',
  id: 'some-id',
  responses: [
    {
      id: '?http-response-200?',
      code: '200',
      contents: [
        {
          id: '?http-media-0?',
          mediaType: 'application/json',
          examples: [
            {
              id: '?http-example-0?',
              key: 'First Example',
              value: { some: 'example' },
            },
            {
              id: '?http-example-1?',
              key: 'Second Example',
              value: '{ "another": "example" }',
            },
          ],
        },
      ],
    },
    {
      id: '?http-response-201?',
      code: '201',
      contents: [
        {
          id: '?http-media-1?',
          mediaType: 'application/json',
          schema: {
            properties: {
              someParameter: {
                type: 'string',
              },
            },
          },
        },
      ],
    },
    {
      id: '?http-response-202?',
      code: '202',
      contents: [
        {
          id: '?http-media-2?',
          mediaType: 'application/json',
          examples: [
            {
              id: '?http-example-2?',
              key: 'Only one example',
              value: { this: 'is an example' },
            },
          ],
        },
      ],
    },
    {
      id: '?http-response-203?',
      code: '203',
      contents: [
        {
          id: '?http-media-3?',
          mediaType: 'application/xml',
          schema: {
            properties: {
              someParameter: {
                type: 'string',
              },
            },
          },
        },
      ],
    },
    {
      id: '?http-response-204?',
      code: '204',
      contents: [
        {
          id: '?http-media-4?',
          mediaType: 'application/json',
          schema: {
            properties: {
              writeOnlyParameter: {
                type: 'string',
                writeOnly: true,
              },
              someOtherParameter: {
                type: 'string',
              },
            },
          },
        },
      ],
    },
    {
      id: '?http-response-404?',
      code: '404',
      contents: [
        {
          id: '?http-media-5?',
          mediaType: 'application/json',
        },
      ],
    },
  ],
};
