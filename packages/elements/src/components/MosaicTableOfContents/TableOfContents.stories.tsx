import { Flex } from '@stoplight/mosaic';
import { Story } from '@storybook/react';
import * as React from 'react';

import { TableOfContents } from './TableOfContents';
import { TableOfContentsProps } from './types';

export default {
  title: 'Internal/MosaicTableOfContents',
  component: TableOfContents,
  argTypes: {
    tree: { table: { category: 'Input' } },
  },
};

export const Playground: Story<TableOfContentsProps> = args => (
  <Flex justifyContent="center" style={{ width: '300px' }}>
    <TableOfContents {...args} />
  </Flex>
);
Playground.storyName = 'Todo API';
Playground.args = {
  tree: [
    {
      id: '/',
      slug: '/',
      title: 'Overview',
      type: 'overview',
      meta: '',
    },
    {
      title: 'Endpoints',
    },
    {
      id: '/operations/get-todos',
      slug: '/operations/get-todos',
      title: 'List Todos',
      type: 'http_operation',
      meta: 'get',
    },
    {
      id: '/operations/post-todos',
      slug: '/operations/post-todos',
      title: 'Create Todo',
      type: 'http_operation',
      meta: 'post',
    },
    {
      id: '/operations/get-todos-id',
      slug: '/operations/get-todos-id',
      title: 'Get Todo',
      type: 'http_operation',
      meta: 'get',
    },
    {
      id: '/operations/put-todos-id',
      slug: '/operations/put-todos-id',
      title: 'Replace Todo',
      type: 'http_operation',
      meta: 'put',
    },
    {
      id: '/operations/delete-todos-id',
      slug: '/operations/delete-todos-id',
      title: 'Delete Todo',
      type: 'http_operation',
      meta: 'delete',
    },
    {
      id: '/operations/patch-todos-id',
      slug: '/operations/patch-todos-id',
      title: 'Update Todo',
      type: 'http_operation',
      meta: 'patch',
    },
    {
      title: 'Users',
      items: [
        {
          id: '/operations/get-users',
          slug: '/operations/get-users',
          title: 'Get User',
          type: 'http_operation',
          meta: 'get',
        },
        {
          id: '/operations/delete-users-userID',
          slug: '/operations/delete-users-userID',
          title: 'Delete User',
          type: 'http_operation',
          meta: 'delete',
        },
        {
          id: '/operations/post-users-userID',
          slug: '/operations/post-users-userID',
          title: 'Create User',
          type: 'http_operation',
          meta: 'post',
        },
      ],
    },
    {
      title: 'Schemas',
    },
    {
      id: '/schemas/Todos',
      slug: '/schemas/Todos',
      title: 'Todo',
      type: 'model',
      meta: '',
    },
    {
      id: '/schemas/User',
      slug: '/schemas/User',
      title: 'User',
      type: 'model',
      meta: '',
    },
  ],
};
