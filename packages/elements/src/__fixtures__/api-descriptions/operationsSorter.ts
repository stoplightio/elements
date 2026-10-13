export const operationsSorter = {
  openapi: '3.1.0',
  info: {
    title: 'Extended Sample API',
    version: '1.0.0',
  },
  paths: {
    '/a-first': {
      get: {
        summary: 'Get the first item',
        'x-weight': 10,
        responses: {
          '200': {
            description: 'Success',
          },
        },
      },
      post: {
        summary: 'Create the last item',
        'x-weight': 30,
        responses: {
          '201': {
            description: 'Created',
          },
        },
      },
    },
    '/m-middle': {
      get: {
        summary: 'Get the middle item',
        'x-weight': 20,
        responses: {
          '200': {
            description: 'Success',
          },
        },
      },
    },
    '/users': {
      get: {
        summary: 'List users',
        tags: ['users'],
        'x-weight': 15,
        responses: {
          '200': {
            description: 'User list',
          },
        },
      },
      post: {
        summary: 'Create a user',
        tags: ['users'],
        'x-weight': 35,
        responses: {
          '201': {
            description: 'User created',
          },
        },
      },
    },
    '/users/{id}': {
      get: {
        summary: 'Get user by ID',
        tags: ['users'],
        'x-weight': 25,
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'User details',
          },
        },
      },
    },
    '/products': {
      get: {
        summary: 'List products',
        tags: ['products'],
        'x-weight': 12,
        responses: {
          '200': {
            description: 'Product list',
          },
        },
      },
      post: {
        summary: 'Create a product',
        tags: ['products'],
        'x-weight': 32,
        responses: {
          '201': {
            description: 'Product created',
          },
        },
      },
    },
    '/products/{id}': {
      delete: {
        summary: 'Delete a product',
        tags: ['products'],
        'x-weight': 28,
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '204': {
            description: 'Product deleted',
          },
        },
      },
    },
  },
  tags: [
    {
      name: 'products',
    },
    {
      name: 'users',
    },
  ],
};
