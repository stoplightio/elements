import { IBranchNode, ITableOfContentsTree } from '../../types';

export const tree: ITableOfContentsTree = {
  items: [
    {
      title: 'Introduction',
      uri: 'docs/introduction.md',
    },
    {
      title: 'UI Overview',
      uri: 'docs/ui-overview.md',
    },
    {
      title: 'Markdown',
    },
    {
      title: 'Markdown Basics',
      uri: 'docs/markdown/basic-syntax.md',
    },
    {
      title: 'Stoplight Flavored Markdown (SMD)',
      uri: 'docs/markdown/stoplight-flavored-markdown.md',
    },
    {
      title: 'Swagger Petstore',
    },
    {
      title: 'Overview',
      uri: 'reference/petstore/openapi.yaml',
    },
    {
      title: 'Pets',
      items: [
        {
          title: 'Create a pet',
          uri: 'reference/petstore/openapi.yaml/paths/~1pets/post',
        },
        {
          title: 'Info for a specific pet',
          uri: 'reference/petstore/openapi.yaml/paths/~1pets~1%7BpetId%7D/get',
        },
        {
          title: 'List all pets',
          uri: 'reference/petstore/openapi.yaml/paths/~1pets/get',
        },
        {
          title: 'Pets',
          uri: 'reference/petstore/openapi.yaml/components/schemas/Pets',
        },
      ],
    },
    {
      title: 'To-dos',
    },
    {
      title: 'Overview',
      uri: 'reference/todos/openapi.json',
    },
    {
      title: 'Todos',
      items: [
        {
          title: 'Create Todo',
          uri: 'reference/todos/openapi.json/paths/~1todos/post',
        },
        {
          title: 'Delete Todo',
          uri: 'reference/todos/openapi.json/paths/~1todos~1%7BtodoId%7D/delete',
        },
        {
          title: 'Get Todo',
          uri: 'reference/todos/openapi.json/paths/~1todos~1%7BtodoId%7D/get',
        },
        {
          title: 'List Todo',
          uri: 'reference/todos/openapi.json/paths/~1todos/get',
        },
        {
          title: 'Update Todo',
          uri: 'reference/todos/openapi.json/paths/~1todos~1%7BtodoId%7D/put',
        },
      ],
    },
    {
      title: 'Models',
    },
    {
      title: 'Category',
      uri: 'reference/petstore/models/category.yaml',
    },
    {
      title: 'Error',
      uri: 'reference/common/models/error.yaml',
    },
    {
      title: 'Pet',
      uri: 'reference/petstore/models/pet.yaml',
    },
    {
      title: 'Todo Full',
      uri: 'reference/todos/models/todo-full.json',
    },
    {
      title: 'Todo Partial',
      uri: 'reference/todos/models/todo-partial.json',
    },
    {
      title: 'User',
      uri: 'reference/todos/models/user.json',
    },
  ],
};
