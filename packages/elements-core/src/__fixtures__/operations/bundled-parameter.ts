export const httpOperation = {
  id: '?http-operation-id?',
  iid: 'POST_todos',
  description: 'This creates a Todo object.\n\nTesting `inline code`.',
  method: 'post',
  path: '/todos',
  summary: 'Create Todo',
  responses: [
    {
      code: '201',
      description: '',
      headers: [],
      contents: [
        {
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
              },
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
                  },
                },
                required: ['id', 'user'],
              },
            ],
            'x-tags': ['Todos'],
          },
          examples: [
            {
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
  servers: [{ url: 'https://todos.stoplight.io' }, { url: 'http://todos.stoplight.io' }],
  request: {
    body: {
      contents: [
        {
          mediaType: 'application/json',
          schema: {
            $ref: '#/__bundled__/paths/~1todos/post/responses/201/schema/allOf/0',
            example: { name: "my todo's name", completed: false },
          },
          examples: [{ key: 'default', value: { name: "my todo's name", completed: false } }],
        },
      ],
    },
  },
  tags: [{ name: 'Todos' }],
  security: [
    [
      {
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
