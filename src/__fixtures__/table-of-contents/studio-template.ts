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
];

export const contents: IContentsNode[] = [
  /** Group by docs */
  /** Sort by path length & alphabetical */
  {
    name: 'Getting Started',
    srn: 'sl/org/project/docs/getting-started.md',
    depth: 0,
    icon: 'arrow-right',
    type: 'item',
  },
  {
    name: 'Welcome',
    srn: 'sl/org/project/docs/welcome.md',
    depth: 0,
    icon: 'arrow-right',
    type: 'item',
  },

  {
    name: 'Guides',
    depth: 0,
    type: 'group',
    icon: 'folder-close',
  },
  {
    name: 'Authentication',
    srn: 'sl/org/project/docs/guides/authentication.md',
    depth: 1,
    icon: 'arrow-right',
    type: 'item',
  },

  {
    name: 'Tutorials',
    depth: 0,
    type: 'group',
    icon: 'folder-close',
  },
  {
    name: 'Billing',
    srn: 'sl/org/project/docs/tutorials/billing.md',
    depth: 1,
    icon: 'arrow-right',
    type: 'item',
  },
  {
    name: 'Signup',
    srn: 'sl/org/project/docs/tutorials/signup.md',
    depth: 1,
    icon: 'arrow-right',
    type: 'item',
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
    icon: 'arrow-right',
  },

  /** Group by tag */
  {
    name: 'Users',
    depth: 0,
    type: 'group',
    icon: 'folder-close',
  },
  {
    name: 'Get User',
    srn: 'sl/org/project/reference/todos/openapi.v1.yml/paths/~1users/get',
    depth: 1,
    icon: 'arrow-right',
  },
  {
    name: 'User',
    srn: 'sl/org/project/reference/todos/models/user',
    depth: 1,
    icon: 'arrow-right',
  },

  /** Group un-tagged */
  {
    name: 'Other',
    depth: 0,
    type: 'group',
    icon: 'folder-close',
  },
  {
    name: 'Get Todo',
    srn: 'sl/org/project/reference/todos/openapi.v1.yml/paths/~1todos/get',
    depth: 1,
    icon: 'arrow-right',
  },
  {
    name: 'Todo',
    srn: 'sl/org/project/reference/todos/models/todos',
    depth: 1,
    icon: 'arrow-right',
  },
];
