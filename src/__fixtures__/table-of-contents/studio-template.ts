import { NodeType } from '@stoplight/types';
import { IContentsNode, IProjectNode } from '../../types';

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
  },
  {
    id: 11,
    type: NodeType.HttpService,
    name: 'Another API',
    srn: 'sl/org/project/openapi.v1.yml',
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
    type: 'group',
  },
  {
    name: 'Authentication',
    srn: 'sl/org/project/docs/guides/authentication.md',
    depth: 1,
  },

  {
    name: 'Tutorials',
    depth: 0,
    type: 'group',
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
    name: 'Another API',
    depth: 0,
    type: 'divider',
  },
  {
    name: 'Overview',
    srn: 'sl/org/project/openapi.v1.yml',
    depth: 0,
  },

  /** Group by tag */
  {
    name: 'Things',
    depth: 0,
    type: 'group',
  },
  {
    name: 'List Things',
    srn: 'sl/org/project/openapi.v1.yml/paths/~1things/get',
    depth: 1,
  },
  {
    name: 'Thing',
    srn: 'sl/org/project/openapi.v1.yml/definitions/thing',
    depth: 1,
  },

  /** Group by http service */
  {
    name: 'Todos API',
    depth: 0,
    type: 'divider',
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
    type: 'group',
  },
  {
    name: 'Get User',
    srn: 'sl/org/project/reference/todos/openapi.v1.yml/paths/~1users/get',
    depth: 1,
  },

  /** Group un-tagged */
  {
    name: 'Other',
    depth: 0,
    type: 'group',
  },
  {
    name: 'Get Todo',
    srn: 'sl/org/project/reference/todos/openapi.v1.yml/paths/~1todos/get',
    depth: 1,
  },

  /** Models */
  {
    name: 'Models',
    depth: 0,
    type: 'divider',
  },
  {
    name: 'Example',
    srn: 'sl/org/project/models/example',
    depth: 0,
  },
  {
    name: 'Todo',
    srn: 'sl/org/project/reference/todos/models/todos',
    depth: 0,
  },
  {
    name: 'User',
    srn: 'sl/org/project/reference/todos/models/user',
    depth: 0,
  },
];
