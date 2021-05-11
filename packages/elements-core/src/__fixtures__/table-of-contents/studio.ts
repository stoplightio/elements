import { IBranchNode, ITableOfContentsTree } from '../../types';

export const nodes: IBranchNode[] = [
  {
    id: 32,
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

export const tree: ITableOfContentsTree = {
  items: [
    {
      title: 'Introduction',
      type: 'item',
      uri: 'docs/introduction.md',
    },
    {
      title: 'UI Overview',
      type: 'item',
      uri: 'docs/ui-overview.md',
    },
    {
      title: 'Markdown',
      type: 'divider',
    },
    {
      title: 'Markdown Basics',
      type: 'item',
      uri: 'docs/markdown/basic-syntax.md',
    },
    {
      title: 'Stoplight Flavored Markdown (SMD)',
      type: 'item',
      uri: 'docs/markdown/stoplight-flavored-markdown.md',
    },
    {
      title: 'Swagger Petstore',
      type: 'divider',
    },
    {
      title: 'Overview',
      type: 'item',
      uri: 'reference/petstore/openapi.yaml',
    },
    {
      title: 'Pets',
      type: 'group',
      items: [
        {
          title: 'Create a pet',
          type: 'item',
          uri: 'reference/petstore/openapi.yaml/paths/~1pets/post',
        },
        {
          title: 'Info for a specific pet',
          type: 'item',
          uri: 'reference/petstore/openapi.yaml/paths/~1pets~1%7BpetId%7D/get',
        },
        {
          title: 'List all pets',
          type: 'item',
          uri: 'reference/petstore/openapi.yaml/paths/~1pets/get',
        },
        {
          title: 'Pets',
          type: 'item',
          uri: 'reference/petstore/openapi.yaml/components/schemas/Pets',
        },
      ],
    },
    {
      title: 'To-dos',
      type: 'divider',
    },
    {
      title: 'Overview',
      type: 'item',
      uri: 'reference/todos/openapi.json',
    },
    {
      title: 'Todos',
      type: 'group',
      items: [
        {
          title: 'Create Todo',
          type: 'item',
          uri: 'reference/todos/openapi.json/paths/~1todos/post',
        },
        {
          title: 'Delete Todo',
          type: 'item',
          uri: 'reference/todos/openapi.json/paths/~1todos~1%7BtodoId%7D/delete',
        },
        {
          title: 'Get Todo',
          type: 'item',
          uri: 'reference/todos/openapi.json/paths/~1todos~1%7BtodoId%7D/get',
        },
        {
          title: 'List Todo',
          type: 'item',
          uri: 'reference/todos/openapi.json/paths/~1todos/get',
        },
        {
          title: 'Update Todo',
          type: 'item',
          uri: 'reference/todos/openapi.json/paths/~1todos~1%7BtodoId%7D/put',
        },
      ],
    },
    {
      title: 'Models',
      type: 'divider',
    },
    {
      title: 'Category',
      type: 'item',
      uri: 'reference/petstore/models/category.yaml',
    },
    {
      title: 'Error',
      type: 'item',
      uri: 'reference/common/models/error.yaml',
    },
    {
      title: 'Pet',
      type: 'item',
      uri: 'reference/petstore/models/pet.yaml',
    },
    {
      title: 'Todo Full',
      type: 'item',
      uri: 'reference/todos/models/todo-full.json',
    },
    {
      title: 'Todo Partial',
      type: 'item',
      uri: 'reference/todos/models/todo-partial.json',
    },
    {
      title: 'User',
      type: 'item',
      uri: 'reference/todos/models/user.json',
    },
  ],
};

export const projectTree: ITableOfContentsTree = {
  items: [
    {
      type: 'item',
      title: 'Introduction',
      uri: '/docs/introduction.md',
    },
    {
      type: 'item',
      title: 'UI Overview',
      uri: '/docs/ui-overview.md',
    },
    {
      type: 'divider',
      title: 'markdown',
    },
    {
      type: 'item',
      title: 'Markdown Basics',
      uri: '/docs/markdown/basic-syntax.md',
    },
    {
      type: 'item',
      title: 'Stoplight Flavored Markdown (SMD)',
      uri: '/docs/markdown/stoplight-flavored-markdown.md',
    },
    {
      type: 'divider',
      title: 'APIS',
    },
    {
      type: 'group',
      title: 'Swagger Petstore',
      items: [
        {
          type: 'group',
          title: 'pets',
          items: [
            {
              type: 'item',
              title: 'List all pets',
              uri: '/reference/petstore/openapi.v1.yaml/paths/~1pets/get',
            },
            {
              type: 'item',
              title: 'Create a pet',
              uri: '/reference/petstore/openapi.v1.yaml/paths/~1pets/post',
            },
            {
              type: 'item',
              title: 'Info for a specific pet',
              uri: '/reference/petstore/openapi.v1.yaml/paths/~1pets~1{petId}/get',
            },
          ],
        },
        {
          type: 'group',
          title: 'Schemas',
          items: [
            {
              type: 'item',
              title: 'Pets',
              uri: '/reference/petstore/openapi.v1.yaml/components/schemas/Pets',
            },
          ],
        },
      ],
      uri: '/reference/petstore/openapi.v1.yaml',
    },
    {
      type: 'group',
      title: 'To-dos',
      items: [
        {
          type: 'group',
          title: 'Todos',
          items: [
            {
              type: 'item',
              title: 'List Todos',
              uri: '/reference/todos/openapi.v1.json/paths/~1todos/get',
            },
            {
              type: 'item',
              title: 'Create Todo',
              uri: '/reference/todos/openapi.v1.json/paths/~1todos/post',
            },
            {
              type: 'item',
              title: 'Delete Todo',
              uri: '/reference/todos/openapi.v1.json/paths/~1todos~1{todoId}/delete',
            },
            {
              type: 'item',
              title: 'Get Todo',
              uri: '/reference/todos/openapi.v1.json/paths/~1todos~1{todoId}/get',
            },
            {
              type: 'item',
              title: 'Update Todo',
              uri: '/reference/todos/openapi.v1.json/paths/~1todos~1{todoId}/put',
            },
          ],
        },
      ],
      uri: '/reference/todos/openapi.v1.json',
    },
    {
      type: 'divider',
      title: 'Schemas',
    },
    {
      type: 'item',
      title: 'Category',
      uri: '/reference/petstore/models/category.v1.yaml',
    },
    {
      type: 'item',
      title: 'Error',
      uri: '/reference/common/models/error.v1.yaml',
    },
    {
      type: 'item',
      title: 'Pet',
      uri: '/reference/petstore/models/pet.v1.yaml',
    },
    {
      type: 'item',
      title: 'Todo Full',
      uri: '/reference/todos/models/todo-full.v1.json',
    },
    {
      type: 'item',
      title: 'Todo Partial',
      uri: '/reference/todos/models/todo-partial.v1.json',
    },
    {
      type: 'item',
      title: 'User',
      uri: '/reference/todos/models/user.v1.json',
    },
  ],
};
