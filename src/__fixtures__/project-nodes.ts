import { NodeType } from '@stoplight/types';
import { IContentsNode, IProjectNode } from '../types';

export const nodes: IProjectNode[] = [
  {
    id: 0,
    type: NodeType.Article,
    name: 'Welcome',
    srn: 'sl/org/project/docs/welcome.md',
    version: '1.0',
    versions: ['1.0'],
  },
  {
    id: 1,
    type: NodeType.Article,
    name: 'Getting Started',
    srn: 'sl/org/project/docs/getting-started.md',
    version: '1.0',
    versions: ['1.0'],
  },
  {
    id: 2,
    type: NodeType.Article,
    name: 'Authentication',
    srn: 'sl/org/project/docs/guides/authentication.md',
    version: '1.0',
    versions: ['1.0'],
  },
  {
    id: 3,
    type: NodeType.Article,
    name: 'Signup',
    srn: 'sl/org/project/docs/tutorials/signup.md',
    version: '1.0',
    versions: ['1.0'],
  },
  {
    id: 4,
    type: NodeType.Article,
    name: 'Billing',
    srn: 'sl/org/project/docs/tutorials/billing.md',
    version: '1.0',
    versions: ['1.0'],
  },
  {
    id: 5,
    type: NodeType.HttpService,
    name: 'Todos API',
    srn: 'sl/org/project/reference/todos/openapi.v1.yml',
    version: '1.0',
    versions: ['1.0'],
  },
  {
    id: 6,
    type: NodeType.HttpOperation,
    name: 'Get User',
    srn: 'sl/org/project/reference/todos/openapi.v1.yml/paths/~1users/get',
    tags: ['users'],
    version: '1.0',
    versions: ['1.0'],
  },
  {
    id: 7,
    type: NodeType.Model,
    name: 'User',
    srn: 'sl/org/project/reference/todos/models/user',
    tags: ['users'],
    version: '1.0',
    versions: ['1.0'],
  },
  {
    id: 8,
    type: NodeType.HttpOperation,
    name: 'Get Todo',
    srn: 'sl/org/project/reference/todos/openapi.v1.yml/paths/~1todos/get',
    tags: [],
    version: '1.0',
    versions: ['1.0'],
  },
  {
    id: 9,
    type: NodeType.Model,
    name: 'Todo',
    srn: 'sl/org/project/reference/todos/models/todos',
    tags: [],
    version: '1.0',
    versions: ['1.0'],
  },
];

export const contents: IContentsNode[] = [
  /** Group by docs */
  /** Sort by path length & alphabetical */
  {
    name: 'Getting Started',
    srn: 'sl/org/project/docs/getting-started.md',
    depth: 0,
  },
  {
    name: 'Welcome',
    srn: 'sl/org/project/docs/welcome.md',
    depth: 0,
  },

  {
    name: 'Guides',
    depth: 0,
  },
  {
    name: 'Authentication',
    srn: 'sl/org/project/docs/guides/authentication.md',
    depth: 1,
  },

  {
    name: 'Tutorials',
    depth: 0,
  },
  {
    name: 'Billing',
    srn: 'sl/org/project/docs/tutorials/billing.md',
    depth: 1,
  },
  {
    name: 'Signup',
    srn: 'sl/org/project/docs/tutorials/signup.md',
    depth: 1,
  },

  /** Group by http service */
  {
    name: 'Todos API',
    depth: 0,
  },
  {
    name: 'Overview',
    srn: 'sl/org/project/reference/todos/openapi.v1.yml',
    depth: 0,
  },

  /** Group by tag */
  {
    name: 'Users',
    depth: 0,
  },
  {
    name: 'Get User',
    srn: 'sl/org/project/reference/todos/openapi.v1.yml/paths/~1users/get',
    depth: 1,
  },
  {
    name: 'User',
    srn: 'sl/org/project/reference/todos/models/user',
    depth: 1,
  },

  /** Group un-tagged */
  {
    name: 'Other',
    depth: 0,
  },
  {
    name: 'Get Todo',
    srn: 'sl/org/project/reference/todos/openapi.v1.yml/paths/~1todos/get',
    depth: 1,
  },
  {
    name: 'Todo',
    srn: 'sl/org/project/reference/todos/models/todos',
    depth: 1,
  },
];
