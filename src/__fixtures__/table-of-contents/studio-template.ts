import { NodeType } from '@stoplight/types';
import { IContentsNodeWithId, IProjectNode } from '../../types';

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
    version: 'v1.0',
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
    versions: ['v1.0', 'v2.0'],
  },
  {
    id: 10,
    type: NodeType.Model,
    name: 'Example',
    srn: 'sl/org/project/models/example',
    tags: [],
    version: 'v1.0',
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

export const contents: IContentsNodeWithId[] = [
  {
    id: 1,
    name: 'Getting Started',
    depth: 0,
    type: 'item',
    icon: 'document',
    href: 'sl/org/project/docs/getting-started.md',
  },
  {
    id: 0,
    name: 'Welcome',
    depth: 0,
    type: 'item',
    icon: 'document',
    href: 'sl/org/project/docs/welcome.md',
  },
  {
    id: '1-0',
    name: 'Guides',
    depth: 0,
    type: 'group',
    icon: 'folder-close',
  },
  {
    id: 2,
    name: 'Authentication',
    depth: 1,
    type: 'item',
    icon: 'document',
    href: 'sl/org/project/docs/guides/authentication.md',
  },
  {
    id: '2-0',
    name: 'Tutorials',
    depth: 0,
    type: 'group',
    icon: 'folder-close',
  },
  {
    id: 4,
    name: 'Billing',
    depth: 1,
    type: 'item',
    icon: 'document',
    href: 'sl/org/project/docs/tutorials/billing.md',
  },
  {
    id: 3,
    name: 'Signup',
    depth: 1,
    type: 'item',
    icon: 'document',
    href: 'sl/org/project/docs/tutorials/signup.md',
  },
  {
    id: 11,
    name: 'Another API',
    depth: 0,
    type: 'divider',
    icon: 'chevron-right',
  },
  {
    id: '11-overview',
    name: 'Overview',
    depth: 0,
    icon: 'document',
    type: 'item',
    href: 'sl/org/project/openapi.v1.yml',
  },
  {
    id: 'things-0',
    name: 'Things',
    depth: 0,
    type: 'group',
    icon: 'folder-close',
  },
  {
    id: 12,
    name: 'List Things',
    depth: 1,
    icon: 'document',
    type: 'item',
    href: 'sl/org/project/openapi.v1.yml/paths/~1things/get',
  },
  {
    id: 13,
    name: 'Thing',
    depth: 1,
    icon: 'document',
    type: 'item',
    href: 'sl/org/project/openapi.v1.yml/definitions/thing',
  },
  {
    id: 5,
    name: 'Todos API',
    depth: 0,
    type: 'divider',
    icon: 'chevron-right',
  },
  {
    id: '5-overview',
    name: 'Overview',
    depth: 0,
    icon: 'document',
    type: 'item',
    href: 'sl/org/project/reference/todos/openapi.v1.yml',
  },
  {
    id: 'users-0',
    name: 'Users',
    depth: 0,
    type: 'group',
    icon: 'folder-close',
  },
  {
    id: 6,
    name: 'Get User',
    depth: 1,
    icon: 'document',
    type: 'item',
    href: 'sl/org/project/reference/todos/openapi.v1.yml/paths/~1users/get',
  },
  {
    id: 'other',
    name: 'Other',
    depth: 0,
    type: 'group',
    icon: 'folder-close',
  },
  {
    id: 8,
    name: 'Get Todo',
    depth: 1,
    icon: 'document',
    type: 'item',
    href: 'sl/org/project/reference/todos/openapi.v1.yml/paths/~1todos/get',
  },
  {
    id: 'models',
    name: 'Models',
    depth: 0,
    type: 'divider',
  },
  {
    id: 10,
    name: 'Example',
    href: 'sl/org/project/models/example',
    depth: 0,
    type: 'item',
    icon: 'document',
  },
  {
    id: 9,
    name: 'Todo',
    href: 'sl/org/project/reference/todos/models/todos',
    depth: 0,
    type: 'item',
    icon: 'document',
  },
  {
    id: 7,
    name: 'User',
    href: 'sl/org/project/reference/todos/models/user',
    depth: 0,
    type: 'item',
    icon: 'document',
  },
];

export const nodeTypeIcons: IContentsNodeWithId[] = [
  {
    id: 1,
    name: 'Getting Started',
    depth: 0,
    type: 'item',
    icon: 'cube',
    href: 'sl/org/project/docs/getting-started.md',
  },
  {
    id: 0,
    name: 'Welcome',
    depth: 0,
    type: 'item',
    icon: 'cube',
    href: 'sl/org/project/docs/welcome.md',
  },
  {
    id: '1-0',
    name: 'Guides',
    depth: 0,
    type: 'group',
  },
  {
    id: 2,
    name: 'Authentication',
    depth: 1,
    type: 'item',
    icon: 'cube',
    href: 'sl/org/project/docs/guides/authentication.md',
  },
  {
    id: '2-0',
    name: 'Tutorials',
    depth: 0,
    type: 'group',
  },
  {
    id: 4,
    name: 'Billing',
    depth: 1,
    type: 'item',
    icon: 'cube',
    href: 'sl/org/project/docs/tutorials/billing.md',
  },
  {
    id: 3,
    name: 'Signup',
    depth: 1,
    type: 'item',
    icon: 'cube',
    href: 'sl/org/project/docs/tutorials/signup.md',
  },
  {
    id: 11,
    name: 'Another API',
    depth: 0,
    type: 'divider',
    icon: 'badge',
  },
  {
    id: '11-overview',
    name: 'Overview',
    depth: 0,
    type: 'item',
    href: 'sl/org/project/openapi.v1.yml',
  },
  {
    id: 'things-0',
    name: 'Things',
    depth: 0,
    type: 'group',
  },
  {
    id: 12,
    name: 'List Things',
    depth: 1,
    icon: 'download',
    type: 'item',
    href: 'sl/org/project/openapi.v1.yml/paths/~1things/get',
  },
  {
    id: 13,
    name: 'Thing',
    depth: 1,
    icon: 'box',
    type: 'item',
    href: 'sl/org/project/openapi.v1.yml/definitions/thing',
  },
  {
    id: 5,
    name: 'Todos API',
    depth: 0,
    type: 'divider',
    icon: 'badge',
  },
  {
    id: '5-overview',
    name: 'Overview',
    depth: 0,
    type: 'item',
    href: 'sl/org/project/reference/todos/openapi.v1.yml',
  },
  {
    id: 'users-0',
    name: 'Users',
    depth: 0,
    type: 'group',
  },
  {
    id: 6,
    name: 'Get User',
    depth: 1,
    icon: 'download',
    type: 'item',
    href: 'sl/org/project/reference/todos/openapi.v1.yml/paths/~1users/get',
  },
  {
    id: 'other',
    name: 'Other',
    depth: 0,
    type: 'group',
  },
  {
    id: 8,
    name: 'Get Todo',
    depth: 1,
    icon: 'download',
    type: 'item',
    href: 'sl/org/project/reference/todos/openapi.v1.yml/paths/~1todos/get',
  },
  {
    id: 'models',
    name: 'Models',
    depth: 0,
    type: 'divider',
  },
  {
    id: 10,
    name: 'Example',
    href: 'sl/org/project/models/example',
    depth: 0,
    type: 'item',
    icon: 'box',
  },
  {
    id: 9,
    name: 'Todo',
    href: 'sl/org/project/reference/todos/models/todos',
    depth: 0,
    type: 'item',
    icon: 'box',
  },
  {
    id: 7,
    name: 'User',
    href: 'sl/org/project/reference/todos/models/user',
    depth: 0,
    type: 'item',
    icon: 'box',
  },
];
