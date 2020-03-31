import { NodeType } from '@stoplight/types';

import { IProjectNode } from '../../types';

export const nodes: IProjectNode[] = [
  {
    id: 0,
    type: NodeType.Article,
    name: 'Welcome',
    srn: 'sl/org/project/docs/welcome.md',
  },
  {
    id: 1,
    type: NodeType.Article,
    name: 'Getting Started',
    srn: 'sl/org/project/docs/getting-started.md',
  },
  {
    id: 2,
    type: NodeType.Article,
    name: 'Authentication',
    srn: 'sl/org/project/docs/guides/authentication.md',
  },
  {
    id: 3,
    type: NodeType.Article,
    name: 'Signup',
    srn: 'sl/org/project/docs/tutorials/signup.md',
  },
  {
    id: 4,
    type: NodeType.Article,
    name: 'Billing',
    srn: 'sl/org/project/docs/tutorials/billing.md',
  },
  {
    id: 5,
    type: NodeType.HttpService,
    name: 'Todos API',
    srn: 'sl/org/project/reference/todos/openapi.v1.yml',
  },
  {
    id: 6,
    type: NodeType.HttpOperation,
    name: 'Get User',
    srn: 'sl/org/project/reference/todos/openapi.v1.yml/paths/~1users/get',
    tags: ['users'],
  },
  {
    id: 7,
    type: NodeType.Model,
    name: 'User',
    srn: 'sl/org/project/reference/todos/models/user',
    tags: ['users'],
    latestVersion: '1.0',
  },
  {
    id: 8,
    type: NodeType.HttpOperation,
    name: 'Get Todo',
    srn: 'sl/org/project/reference/todos/openapi.v1.yml/paths/~1todos/get',
    tags: [],
  },
  {
    id: 9,
    type: NodeType.Model,
    name: 'Todo',
    srn: 'sl/org/project/reference/todos/models/todos',
    tags: [],
  },
  {
    id: 10,
    type: NodeType.Model,
    name: 'Example',
    srn: 'sl/org/project/models/example',
    tags: [],
    latestVersion: '1.0',
  },
  {
    id: 11,
    type: NodeType.HttpService,
    name: 'Another API',
    srn: 'sl/org/project/openapi.v1.yml',
    latestVersion: '1.0',
  },
  {
    id: 12,
    type: NodeType.HttpOperation,
    name: 'List Things',
    srn: 'sl/org/project/openapi.v1.yml/paths/~1things/get',
    tags: ['things'],
  },
  {
    id: 13,
    type: NodeType.Model,
    name: 'Thing',
    srn: 'sl/org/project/openapi.v1.yml/definitions/thing',
    tags: ['things'],
  },
];
