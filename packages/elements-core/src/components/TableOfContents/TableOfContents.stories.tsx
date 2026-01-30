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
    {
      id: '/',
      slug: '/',
      title: 'Overview',
      type: 'overview',
      meta: '',
      index: '0-',
    },
    {
      title: 'Endpoints',
      index: '1-',
    },
    {
      id: '/operations/get-todos',
      slug: '/operations/get-todos',
      title: 'List Todos',
      type: 'http_operation',
      meta: 'get',
      index: '2-',
    },
    {
      id: '/operations/post-todos',
      slug: '/operations/post-todos',
      title: 'Create Todo',
      type: 'http_operation',
      meta: 'post',
      index: '3-',
    },
    {
      id: '/operations/get-todos-id',
      slug: '/operations/get-todos-id',
      title: 'Get Todo',
      type: 'http_operation',
      meta: 'get',
      index: '4-',
    },
    {
      id: '/operations/put-todos-id',
      slug: '/operations/put-todos-id',
      title: 'Replace Todo',
      type: 'http_operation',
      meta: 'put',
      index: '5-',
    },
    {
      id: '/operations/delete-todos-id',
      slug: '/operations/delete-todos-id',
      title: 'Delete Todo',
      type: 'http_operation',
      meta: 'delete',
      index: '6-',
    },
    {
      id: '/operations/patch-todos-id',
      slug: '/operations/patch-todos-id',
      title: 'Update Todo',
      type: 'http_operation',
      meta: 'patch',
      index: '7-',
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
          index: '8-0-',
        },
        {
          id: '/operations/delete-users-userID',
          slug: '/operations/delete-users-userID',
          title: 'Delete User',
          type: 'http_operation',
          meta: 'delete',
          index: '8-1-',
        },
        {
          id: '/operations/post-users-userID',
          slug: '/operations/post-users-userID',
          title: 'Create User',
          type: 'http_operation',
          meta: 'post',
          index: '8-2-',
        },
      ],
      index: '8-',
    },
    {
      title: 'Schemas',
      index: '9-',
    },
    {
      id: '/schemas/Todos',
      slug: '/schemas/Todos',
      title: 'Todo',
      type: 'model',
      meta: '',
      version: '1.0.2',
      index: '10-',
    },
    {
      id: '/schemas/User',
      slug: '/schemas/User',
      title: 'User',
      type: 'model',
      meta: '',
      index: '11-',
    },
  ],
};
