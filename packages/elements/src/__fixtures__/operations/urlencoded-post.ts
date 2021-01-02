import { HttpParamStyles, IHttpOperation } from '@stoplight/types';

export const httpOperation: IHttpOperation = {
  id: '?http-operation-id?',
  iid: 'POST_todos',
  method: 'post',
  path: '/todos',
  summary: 'Create Todo',
  responses: [
    {
      code: '200',
      description: '',
      headers: [
        {
          schema: {
            type: 'string',
            description: 'Resolver errors.',
          },
          name: 'X-Stoplight-Resolver',
          style: HttpParamStyles.Simple,
          required: true,
        },
      ],
      contents: [
        {
          mediaType: 'application/json',
          schema: {
            $schema: 'http://json-schema.org/draft-04/schema#',
            title: 'Todo Full',
            allOf: [
              {
                $schema: 'http://json-schema.org/draft-04/schema#',
                title: 'Todo Partial',
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                  },
                  completed: {
                    type: ['boolean', 'null'],
                  },
                },
                required: ['name', 'completed'],
                'x-tags': ['Todos'],
              },
              {
                type: 'object',
                properties: {
                  id: {
                    type: 'integer',
                    minimum: 0,
                    maximum: 1000000,
                  },
                  completed_at: {
                    type: ['string', 'null'],
                    format: 'date-time',
                  },
                  created_at: {
                    type: 'string',
                    format: 'date-time',
                  },
                  updated_at: {
                    type: 'string',
                    format: 'date-time',
                  },
                  user: {
                    $schema: 'http://json-schema.org/draft-04/schema#',
                    title: 'User',
                    type: 'object',
                    properties: {
                      name: {
                        type: 'string',
                        description: "The user's full name.",
                      },
                      age: {
                        type: 'number',
                        minimum: 0,
                        maximum: 150,
                      },
                    },
                    required: ['name', 'age'],
                    'x-tags': ['Todos'],
                    description: 'Here lies the user model',
                  },
                },
                required: ['id', 'user'],
              },
            ],
            'x-tags': ['Todos'],
          },
        },
      ],
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
          mediaType: 'application/x-www-form-urlencoded',
          schema: {
            $schema: 'http://json-schema.org/draft-04/schema#',
            title: 'Todo Partial',
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
              completed: {
                type: 'boolean',
              },
              someEnum: {
                type: 'string',
                enum: ['a', 'b', 'c'],
              },
            },
            required: ['name', 'completed'],
            'x-tags': ['Todos'],
          },
          examples: [
            {
              key: 'Incomplete',
              value: {
                name: 'Docs Module',
                completed: false,
              },
            },
            {
              key: 'Completed',
              value: {
                name: 'Studio',
                completed: true,
              },
            },
          ],
        },
      ],
    },
  },
  tags: [
    {
      name: 'Todos',
    },
  ],
};

export default httpOperation;
