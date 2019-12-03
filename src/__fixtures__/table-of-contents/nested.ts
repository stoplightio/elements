import { NodeType } from '@stoplight/types';
import { IContentsNodeWithId, IProjectNode } from '../../types';

export const nodes: IProjectNode[] = [
  {
    id: 'gzv028oc',
    type: NodeType.Article,
    name: 'One level Deep - 1',
    srn: 'gh/stoplightio/studio/docs/one-level-deep/file-1.md',
  },
  {
    id: 'gzv028oc',
    type: NodeType.Article,
    name: 'One level Deep - 2',
    srn: 'gh/stoplightio/studio/docs/one-level-deep/file-2.md',
  },

  {
    id: 'gzv028oc',
    type: NodeType.Article,
    name: 'Two levels Deep - 1',
    srn: 'gh/stoplightio/studio/docs/one-level-deep/two-levels-deep/file-1.md',
  },
  {
    id: 'gzv028oc',
    type: NodeType.Article,
    name: 'Two levels Deep - 2',
    srn: 'gh/stoplightio/studio/docs/one-level-deep/two-levels-deep/file-2.md',
  },

  {
    id: 'gzv028oc',
    type: NodeType.Article,
    name: 'Four levels Deep - 1',
    srn: 'gh/stoplightio/studio/docs/one-level-deep/two-levels-deep/three-levels-deep/four-levels-deep/file-1.md',
  },
  {
    id: 'gzv028oc',
    type: NodeType.Article,
    name: 'Four levels Deep - 2',
    srn: 'gh/stoplightio/studio/docs/one-level-deep/two-levels-deep/three-levels-deep/four-levels-deep/file-2.md',
  },
];

export const contents: IContentsNodeWithId[] = [
  {
    id: '0-0',
    name: 'One Level Deep',
    depth: 0,
    type: 'group',
    icon: 'folder-close',
  },
  {
    id: 'gzv028oc',
    name: 'One level Deep - 1',
    depth: 1,
    type: 'item',
    icon: 'document',
    href: 'gh/stoplightio/studio/docs/one-level-deep/file-1.md',
  },
  {
    id: 'gzv028oc',
    name: 'One level Deep - 2',
    depth: 1,
    type: 'item',
    icon: 'document',
    href: 'gh/stoplightio/studio/docs/one-level-deep/file-2.md',
  },
  {
    id: '2-1',
    name: 'Two Levels Deep',
    depth: 1,
    type: 'group',
    icon: 'folder-close',
  },
  {
    id: 'gzv028oc',
    name: 'Two levels Deep - 1',
    depth: 2,
    type: 'item',
    icon: 'document',
    href: 'gh/stoplightio/studio/docs/one-level-deep/two-levels-deep/file-1.md',
  },
  {
    id: 'gzv028oc',
    name: 'Two levels Deep - 2',
    depth: 2,
    type: 'item',
    icon: 'document',
    href: 'gh/stoplightio/studio/docs/one-level-deep/two-levels-deep/file-2.md',
  },
  {
    id: '4-2',
    name: 'Three Levels Deep',
    depth: 2,
    type: 'group',
    icon: 'folder-close',
  },
  {
    id: '4-3',
    name: 'Four Levels Deep',
    depth: 3,
    type: 'group',
    icon: 'folder-close',
  },
  {
    id: 'gzv028oc',
    name: 'Four levels Deep - 1',
    depth: 4,
    type: 'item',
    icon: 'document',
    href: 'gh/stoplightio/studio/docs/one-level-deep/two-levels-deep/three-levels-deep/four-levels-deep/file-1.md',
  },
  {
    id: 'gzv028oc',
    name: 'Four levels Deep - 2',
    depth: 4,
    type: 'item',
    icon: 'document',
    href: 'gh/stoplightio/studio/docs/one-level-deep/two-levels-deep/three-levels-deep/four-levels-deep/file-2.md',
  },
];

export const nodeTypeIcons: IContentsNodeWithId[] = [
  {
    id: '0-0',
    name: 'One Level Deep',
    depth: 0,
    type: 'group',
  },
  {
    id: 'gzv028oc',
    name: 'One level Deep - 1',
    depth: 1,
    type: 'item',
    icon: 'cube',
    href: 'gh/stoplightio/studio/docs/one-level-deep/file-1.md',
  },
  {
    id: 'gzv028oc',
    name: 'One level Deep - 2',
    depth: 1,
    type: 'item',
    icon: 'cube',
    href: 'gh/stoplightio/studio/docs/one-level-deep/file-2.md',
  },
  {
    id: '2-1',
    name: 'Two Levels Deep',
    depth: 1,
    type: 'group',
  },
  {
    id: 'gzv028oc',
    name: 'Two levels Deep - 1',
    depth: 2,
    type: 'item',
    icon: 'cube',
    href: 'gh/stoplightio/studio/docs/one-level-deep/two-levels-deep/file-1.md',
  },
  {
    id: 'gzv028oc',
    name: 'Two levels Deep - 2',
    depth: 2,
    type: 'item',
    icon: 'cube',
    href: 'gh/stoplightio/studio/docs/one-level-deep/two-levels-deep/file-2.md',
  },
  {
    id: '4-2',
    name: 'Three Levels Deep',
    depth: 2,
    type: 'group',
  },
  {
    id: '4-3',
    name: 'Four Levels Deep',
    depth: 3,
    type: 'group',
  },
  {
    id: 'gzv028oc',
    name: 'Four levels Deep - 1',
    depth: 4,
    type: 'item',
    icon: 'cube',
    href: 'gh/stoplightio/studio/docs/one-level-deep/two-levels-deep/three-levels-deep/four-levels-deep/file-1.md',
  },
  {
    id: 'gzv028oc',
    name: 'Four levels Deep - 2',
    depth: 4,
    type: 'item',
    icon: 'cube',
    href: 'gh/stoplightio/studio/docs/one-level-deep/two-levels-deep/three-levels-deep/four-levels-deep/file-2.md',
  },
];
