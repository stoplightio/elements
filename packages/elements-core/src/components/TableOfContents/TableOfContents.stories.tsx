import { Flex } from '@stoplight/mosaic';
import { Story } from '@storybook/react';
import * as React from 'react';

import { TableOfContents } from './TableOfContents';
import { TableOfContentsProps } from './types';

export default {
  title: 'Internal/TableOfContents',
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
    { groupId: 0, groupIndex: 0, id: '/', slug: '/', title: 'Overview', type: 'overview', meta: '' },
    {
      title: 'Endpoints',
    },
    {
      groupId: 2,
      groupIndex: 2,
      id: '/operations/get-todos',
      slug: '/operations/get-todos',
      title: 'List Todos',
      type: 'http_operation',
      meta: 'get',
    },
    {
      groupId: 3,
      groupIndex: 3,
      id: '/operations/post-todos',
      slug: '/operations/post-todos',
      title: 'Create Todo',
      type: 'http_operation',
      meta: 'post',
    },
    {
      groupId: 4,
      groupIndex: 4,
      id: '/operations/get-todos-id',
      slug: '/operations/get-todos-id',
      title: 'Get Todo',
      type: 'http_operation',
      meta: 'get',
    },
    {
      groupId: 5,
      groupIndex: 5,
      id: '/operations/put-todos-id',
      slug: '/operations/put-todos-id',
      title: 'Replace Todo',
      type: 'http_operation',
      meta: 'put',
    },
    {
      groupId: 6,
      groupIndex: 6,
      id: '/operations/delete-todos-id',
      slug: '/operations/delete-todos-id',
      title: 'Delete Todo',
      type: 'http_operation',
      meta: 'delete',
    },
    {
      groupId: 7,
      groupIndex: 7,
      id: '/operations/patch-todos-id',
      slug: '/operations/patch-todos-id',
      title: 'Update Todo',
      type: 'http_operation',
      meta: 'patch',
    },
    {
      groupId: 8,
      groupIndex: 8,
      title: 'Users',
      items: [
        {
          groupId: 8,
          groupIndex: 0,
          id: '/operations/get-users',
          slug: '/operations/get-users',
          title: 'Get User',
          type: 'http_operation',
          meta: 'get',
        },
        {
          groupId: 8,
          groupIndex: 1,
          id: '/operations/delete-users-userID',
          slug: '/operations/delete-users-userID',
          title: 'Delete User',
          type: 'http_operation',
          meta: 'delete',
        },
        {
          groupId: 8,
          groupIndex: 2,
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
      groupId: 10,
      groupIndex: 10,
      id: '/schemas/Todos',
      slug: '/schemas/Todos',
      title: 'Todo',
      type: 'model',
      meta: '',
      version: '1.0.2',
    },
    { groupId: 11, groupIndex: 11, id: '/schemas/User', slug: '/schemas/User', title: 'User', type: 'model', meta: '' },
  ],
};
