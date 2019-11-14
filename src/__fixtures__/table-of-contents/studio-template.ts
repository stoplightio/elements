import { NodeType } from '@stoplight/types';
import { IContentsNode } from '@stoplight/ui-kit/TableOfContents/types';
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
    href: 'sl/org/project/docs/getting-started.md',
    depth: 0,
    icon: 'document',
    type: 'item',
    isActive: false,
  },
  {
    name: 'Welcome',
    href: 'sl/org/project/docs/welcome.md',
    depth: 0,
    icon: 'document',
    type: 'item',
    isActive: false,
  },

  {
    name: 'Guides',
    depth: 0,
    type: 'group',
    icon: 'folder-close',
  },
  {
    name: 'Authentication',
    href: 'sl/org/project/docs/guides/authentication.md',
    depth: 1,
    icon: 'document',
    type: 'item',
    isActive: false,
  },

  {
    name: 'Tutorials',
    depth: 0,
    type: 'group',
    icon: 'folder-close',
  },
  {
    name: 'Billing',
    href: 'sl/org/project/docs/tutorials/billing.md',
    depth: 1,
    icon: 'document',
    type: 'item',
    isActive: false,
  },
  {
    name: 'Signup',
    href: 'sl/org/project/docs/tutorials/signup.md',
    depth: 1,
    icon: 'document',
    type: 'item',
    isActive: false,
  },

  /** Group by http service */
  {
    name: 'Another API',
    depth: 0,
    type: 'divider',
    icon: 'chevron-right',
  },
  {
    name: 'Overview',
    href: 'sl/org/project/openapi.v1.yml',
    icon: 'document',
    isActive: false,
    type: 'item',
    depth: 0,
  },

  /** Group by tag */
  {
    name: 'Things',
    depth: 0,
    type: 'group',
    icon: 'folder-close',
  },
  {
    name: 'List Things',
    href: 'sl/org/project/openapi.v1.yml/paths/~1things/get',
    icon: 'document',
    isActive: false,
    type: 'item',
    depth: 1,
  },
  {
    name: 'Thing',
    href: 'sl/org/project/openapi.v1.yml/definitions/thing',
    icon: 'document',
    isActive: false,
    type: 'item',
    depth: 1,
  },

  /** Group by http service */
  {
    name: 'Todos API',
    depth: 0,
    type: 'divider',
    icon: 'chevron-right',
  },
  {
    name: 'Overview',
    href: 'sl/org/project/reference/todos/openapi.v1.yml',
    depth: 0,
    icon: 'document',
    type: 'item',
    isActive: false,
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
    href: 'sl/org/project/reference/todos/openapi.v1.yml/paths/~1users/get',
    depth: 1,
    icon: 'document',
    type: 'item',
    isActive: false,
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
    href: 'sl/org/project/reference/todos/openapi.v1.yml/paths/~1todos/get',
    depth: 1,
    icon: 'document',
    type: 'item',
    isActive: false,
  },

  /** Models */
  {
    name: 'Models',
    depth: 0,
    type: 'divider',
  },
  {
    name: 'Example',
    href: 'sl/org/project/models/example',
    depth: 0,
    icon: 'document',
    type: 'item',
    isActive: false,
  },
  {
    name: 'Todo',
    href: 'sl/org/project/reference/todos/models/todos',
    depth: 0,
    icon: 'document',
    type: 'item',
    isActive: false,
  },
  {
    name: 'User',
    href: 'sl/org/project/reference/todos/models/user',
    depth: 0,
    icon: 'document',
    type: 'item',
    isActive: false,
  },
];

export const nodeTypeIcons: IContentsNode[] = [
  /** Group by docs */
  /** Sort by path length & alphabetical */
  {
    name: 'Getting Started',
    href: 'sl/org/project/docs/getting-started.md',
    depth: 0,
    icon: 'cube',
    type: 'item',
    isActive: false,
  },
  {
    name: 'Welcome',
    href: 'sl/org/project/docs/welcome.md',
    depth: 0,
    icon: 'cube',
    type: 'item',
    isActive: false,
  },

  {
    name: 'Guides',
    depth: 0,
    type: 'group',
    icon: undefined,
  },
  {
    name: 'Authentication',
    href: 'sl/org/project/docs/guides/authentication.md',
    depth: 1,
    icon: 'cube',
    type: 'item',
    isActive: false,
  },

  {
    name: 'Tutorials',
    depth: 0,
    type: 'group',
    icon: undefined,
  },
  {
    name: 'Billing',
    href: 'sl/org/project/docs/tutorials/billing.md',
    depth: 1,
    icon: 'cube',
    type: 'item',
    isActive: false,
  },
  {
    name: 'Signup',
    href: 'sl/org/project/docs/tutorials/signup.md',
    depth: 1,
    icon: 'cube',
    type: 'item',
    isActive: false,
  },

  /** Group by http service */
  {
    name: 'Another API',
    depth: 0,
    type: 'divider',
    icon: 'badge',
  },
  {
    name: 'Overview',
    href: 'sl/org/project/openapi.v1.yml',
    icon: undefined,
    isActive: false,
    type: 'item',
    depth: 0,
  },

  /** Group by tag */
  {
    name: 'Things',
    depth: 0,
    type: 'group',
    icon: undefined,
  },
  {
    name: 'List Things',
    href: 'sl/org/project/openapi.v1.yml/paths/~1things/get',
    icon: 'download',
    isActive: false,
    type: 'item',
    depth: 1,
  },
  {
    name: 'Thing',
    href: 'sl/org/project/openapi.v1.yml/definitions/thing',
    icon: 'box',
    isActive: false,
    type: 'item',
    depth: 1,
  },

  /** Group by http service */
  {
    name: 'Todos API',
    depth: 0,
    type: 'divider',
    icon: 'badge',
  },
  {
    name: 'Overview',
    href: 'sl/org/project/reference/todos/openapi.v1.yml',
    depth: 0,
    icon: undefined,
    type: 'item',
    isActive: false,
  },

  /** Group by tag */
  {
    name: 'Users',
    depth: 0,
    type: 'group',
    icon: undefined,
  },
  {
    name: 'Get User',
    href: 'sl/org/project/reference/todos/openapi.v1.yml/paths/~1users/get',
    depth: 1,
    icon: 'download',
    type: 'item',
    isActive: false,
  },

  /** Group un-tagged */
  {
    name: 'Other',
    depth: 0,
    type: 'group',
    icon: undefined,
  },
  {
    name: 'Get Todo',
    href: 'sl/org/project/reference/todos/openapi.v1.yml/paths/~1todos/get',
    depth: 1,
    icon: 'download',
    type: 'item',
    isActive: false,
  },

  /** Models */
  {
    name: 'Models',
    depth: 0,
    type: 'divider',
  },
  {
    name: 'Example',
    href: 'sl/org/project/models/example',
    depth: 0,
    icon: 'box',
    type: 'item',
    isActive: false,
  },
  {
    name: 'Todo',
    href: 'sl/org/project/reference/todos/models/todos',
    depth: 0,
    icon: 'box',
    type: 'item',
    isActive: false,
  },
  {
    name: 'User',
    href: 'sl/org/project/reference/todos/models/user',
    depth: 0,
    icon: 'box',
    type: 'item',
    isActive: false,
  },
];
