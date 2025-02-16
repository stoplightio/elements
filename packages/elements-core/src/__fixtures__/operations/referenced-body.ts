import { IHttpOperation } from '@stoplight/types';

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
            title: 'Todo Partial',
            type: 'object',
            properties: { name: { type: 'string' }, completed: { type: ['boolean', 'null'] } },
            required: ['name', 'completed'],
          },
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
            $ref: '#/__bundled__/schema',
          },
        },
      ],
    },
  },
  tags: [
    {
      id: '?http-tags-todos?',
      name: 'Todos',
    },
  ],
  __bundled__: {
    schema: {
      title: 'Todo Partial',
      type: 'object',
      properties: { name: { type: 'string' }, completed: { type: ['boolean', 'null'] } },
      required: ['name', 'completed'],
    },
  },
};
