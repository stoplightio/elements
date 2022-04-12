import { IHttpOperation } from '@stoplight/types';
import type { JSONSchema7 } from 'json-schema';

export const httpOperation: IHttpOperation & { __bundled__: unknown } = {
  id: '?http-operation-id?',
  iid: 'POST_todos',
  description: 'This creates a Todo object.\n\nTesting `inline code`.',
  method: 'post',
  path: '/todos',
  summary: 'Create Todo',
  responses: [
    {
      id: '?http-response-201?',
      code: '201',
      description: '',
      headers: [],
      contents: [
        {
          id: '?http-media-0?',
          mediaType: 'application/json',
          schema: {
            title: 'Todo Full',
            allOf: [
              {
                title: 'Todo Partial',
                type: 'object',
                properties: { name: { type: 'string' }, completed: { type: ['boolean', 'null'] } },
                required: ['name', 'completed'],
                'x-tags': ['Todos'],
              } as JSONSchema7 & { 'x-tags': string[] },
              {
                type: 'object',
                properties: {
                  id: { type: 'integer', minimum: 0, maximum: 1000000 },
                  completed_at: { type: ['string', 'null'], format: 'date-time' },
                  created_at: { type: 'string', format: 'date-time' },
                  updated_at: { type: 'string', format: 'date-time' },
                  user: {
                    title: 'User',
                    type: 'object',
                    properties: {
                      name: { type: 'string', description: "The user's full name." },
                      age: { type: 'number', minimum: 0, maximum: 150 },
                    },
                    required: ['name', 'age'],
                    'x-tags': ['Todos'],
                  } as JSONSchema7 & { 'x-tags': string[] },
                },
                required: ['id', 'user'],
              },
            ],
            'x-tags': ['Todos'],
          } as JSONSchema7 & { 'x-tags': string[] },
          examples: [
            {
              id: '?http-example-0?',
              key: 'application/json',
              value: {
                id: 9000,
                name: "It's Over 9000!!!",
                completed: null,
                completed_at: null,
                created_at: '2014-08-28T14:14:28.494Z',
                updated_at: '2014-08-28T14:14:28.494Z',
              },
            },
          ],
        },
      ],
    },
  ],
  servers: [
    { id: '?http-server-0?', url: 'https://todos.stoplight.io' },
    { id: '?http-server-1?', url: 'http://todos.stoplight.io' },
  ],
  request: {
    body: {
      id: '?http-request-body?',
      contents: [
        {
          id: '?http-media-1?',
          mediaType: 'application/json',
          schema: {
            $ref: '#/__bundled__/paths/~1todos/post/responses/201/schema/allOf/0',
            examples: [{ id: '?http-example-1?', name: "my todo's name", completed: false }],
          },
          examples: [{ id: '?http-example-2?', key: 'default', value: { name: "my todo's name", completed: false } }],
        },
      ],
    },
  },
  tags: [{ name: 'Todos' }],
  security: [
    [
      {
        id: '?http-security-apiKey?',
        type: 'apiKey',
        name: 'apikey',
        in: 'query',
        description: "Use `?apikey=123` to authenticate requests. It's super secure.",
        key: 'apikey',
      },
    ],
  ],
  __bundled__: {
    paths: {
      '/todos': {
        post: {
          responses: {
            '201': {
              schema: {
                allOf: [
                  {
                    title: 'Todo Partial',
                    type: 'object',
                    properties: { name: { type: 'string' }, completed: { type: ['boolean', 'null'] } },
                    required: ['name', 'completed'],
                    'x-tags': ['Todos'],
                  },
                ],
              },
            },
          },
        },
      },
    },
  },
};
