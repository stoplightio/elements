import { IBranchNode } from '../../types';

export const nodes: IBranchNode[] = [
  {
    id: 32,
    baseUri: '/docs/introduction.md',
    node: {
      id: 1,
      uri: '/docs/introduction.md',
    },
    snapshot: {
      id: 1,
      type: 'article',
      name: 'Introduction',
      tagNames: ['00. Welcome'],
    },
  },
  {
    id: 39,
    baseUri: '/docs/markdown/basic-syntax.md',
    node: {
      id: 3,
      uri: '/docs/markdown/basic-syntax.md',
    },
    snapshot: {
      id: 40462,
      type: 'article',
      name: 'Markdown Basics',
      tagNames: ['01. Using Markdown'],
    },
  },
  {
    id: 40,
    baseUri: '/docs/markdown/stoplight-flavored-markdown.md',
    node: {
      id: 4,
      uri: '/docs/markdown/stoplight-flavored-markdown.md',
    },
    snapshot: {
      id: 4,
      type: 'article',
      name: 'Stoplight Flavored Markdown (SMD)',
      tagNames: ['01. Using Markdown'],
    },
  },
  {
    id: 36,
    baseUri: '/docs/ui-overview.md',
    node: {
      id: 2,
      uri: '/docs/ui-overview.md',
    },
    snapshot: {
      id: 2,
      type: 'article',
      name: 'UI Overview',
      tagNames: ['00. Welcome'],
    },
  },
  {
    id: 41,
    baseUri: '/reference/common/models/error.yaml',
    node: {
      id: 5,
      uri: '/reference/common/models/error.v1.yaml',
    },
    snapshot: {
      id: 5,
      type: 'model',
      name: 'Error',
      tagNames: ['Common'],
    },
  },
  {
    id: 45,
    baseUri: '/reference/petstore/models/category.yaml',
    node: {
      id: 6,
      uri: '/reference/petstore/models/category.v1.yaml',
    },
    snapshot: {
      id: 6,
      type: 'model',
      name: 'Category',
      tagNames: ['Pets'],
    },
  },
  {
    id: 46,
    baseUri: '/reference/petstore/models/pet.yaml',
    node: {
      id: 7,
      uri: '/reference/petstore/models/pet.v1.yaml',
    },
    snapshot: {
      id: 7,
      type: 'model',
      name: 'Pet',
      tagNames: ['Pets'],
    },
  },
  {
    id: 51,
    baseUri: '/reference/petstore/openapi.yaml',
    node: {
      id: 12,
      uri: '/reference/petstore/openapi.v1.yaml',
    },
    snapshot: {
      id: 12,
      type: 'http_service',
      name: 'Swagger Petstore',
      tagNames: [],
    },
  },
  {
    id: 47,
    baseUri: '/reference/petstore/openapi.yaml/components/schemas/Pets',
    node: {
      id: 8,
      uri: '/reference/petstore/openapi.v1.yaml/components/schemas/Pets',
    },
    snapshot: {
      id: 8,
      type: 'model',
      name: 'Pets',
      tagNames: ['Pets'],
    },
  },
  {
    id: 55,
    baseUri: '/reference/petstore/openapi.yaml/paths/~1pets~1{petId}/get',
    node: {
      id: 16,
      uri: '/reference/petstore/openapi.v1.yaml/paths/~1pets~1{petId}/get',
    },
    snapshot: {
      id: 37441,
      type: 'http_operation',
      name: 'Info for a specific pet',
      tagNames: ['pets'],
    },
  },
  {
    id: 53,
    baseUri: '/reference/petstore/openapi.yaml/paths/~1pets/get',
    node: {
      id: 14,
      uri: '/reference/petstore/openapi.v1.yaml/paths/~1pets/get',
    },
    snapshot: {
      id: 37439,
      type: 'http_operation',
      name: 'List all pets',
      tagNames: ['pets'],
    },
  },
  {
    id: 54,
    baseUri: '/reference/petstore/openapi.yaml/paths/~1pets/post',
    node: {
      id: 15,
      uri: '/reference/petstore/openapi.v1.yaml/paths/~1pets/post',
    },
    snapshot: {
      id: 35833,
      type: 'http_operation',
      name: 'Create a pet',
      tagNames: ['pets'],
    },
  },
  {
    id: 48,
    baseUri: '/reference/todos/models/todo-full.json',
    node: {
      id: 9,
      uri: '/reference/todos/models/todo-full.v1.json',
    },
    snapshot: {
      id: 9,
      type: 'model',
      name: 'Todo Full',
      tagNames: ['Todos'],
    },
  },
  {
    id: 49,
    baseUri: '/reference/todos/models/todo-partial.json',
    node: {
      id: 10,
      uri: '/reference/todos/models/todo-partial.v1.json',
    },
    snapshot: {
      id: 10,
      type: 'model',
      name: 'Todo Partial',
      tagNames: ['Todos'],
    },
  },
  {
    id: 50,
    baseUri: '/reference/todos/models/user.json',
    node: {
      id: 11,
      uri: '/reference/todos/models/user.v1.json',
    },
    snapshot: {
      id: 11,
      type: 'model',
      name: 'User',
      tagNames: ['Todos'],
    },
  },
  {
    id: 52,
    baseUri: '/reference/todos/openapi.json',
    node: {
      id: 13,
      uri: '/reference/todos/openapi.v1.json',
    },
    snapshot: {
      id: 13,
      type: 'http_service',
      name: 'To-dos',
      tagNames: ['Todos'],
    },
  },
  {
    id: 58,
    baseUri: '/reference/todos/openapi.json/paths/~1todos~1{todoId}/delete',
    node: {
      id: 19,
      uri: '/reference/todos/openapi.v1.json/paths/~1todos~1{todoId}/delete',
    },
    snapshot: {
      id: 37444,
      type: 'http_operation',
      name: 'Delete Todo',
      tagNames: ['Todos'],
    },
  },
  {
    id: 56,
    baseUri: '/reference/todos/openapi.json/paths/~1todos~1{todoId}/get',
    node: {
      id: 17,
      uri: '/reference/todos/openapi.v1.json/paths/~1todos~1{todoId}/get',
    },
    snapshot: {
      id: 37442,
      type: 'http_operation',
      name: 'Get Todo',
      tagNames: ['Todos'],
    },
  },
  {
    id: 57,
    baseUri: '/reference/todos/openapi.json/paths/~1todos~1{todoId}/put',
    node: {
      id: 18,
      uri: '/reference/todos/openapi.v1.json/paths/~1todos~1{todoId}/put',
    },
    snapshot: {
      id: 37443,
      type: 'http_operation',
      name: 'Update Todo',
      tagNames: ['Todos'],
    },
  },
  {
    id: 60,
    baseUri: '/reference/todos/openapi.json/paths/~1todos/get',
    node: {
      id: 21,
      uri: '/reference/todos/openapi.v1.json/paths/~1todos/get',
    },
    snapshot: {
      id: 37446,
      type: 'http_operation',
      name: 'List Todos',
      tagNames: ['Todos'],
    },
  },
  {
    id: 59,
    baseUri: '/reference/todos/openapi.json/paths/~1todos/post',
    node: {
      id: 20,
      uri: '/reference/todos/openapi.v1.json/paths/~1todos/post',
    },
    snapshot: {
      id: 37445,
      type: 'http_operation',
      name: 'Create Todo',
      tagNames: ['Todos'],
    },
  },
];
