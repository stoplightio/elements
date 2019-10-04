import { NodeType } from '@stoplight/types';
import { IContentsNode, IProjectNode } from '../../types';

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

export const contents: IContentsNode[] = [
  {
    depth: 0,
    name: 'One Level Deep',
    type: 'group',
    icon: 'folder-close',
  },
  {
    depth: 1,
    name: 'One level Deep - 1',
    srn: 'gh/stoplightio/studio/docs/one-level-deep/file-1.md',
    icon: 'document',
    type: 'item',
  },
  {
    depth: 1,
    name: 'One level Deep - 2',
    srn: 'gh/stoplightio/studio/docs/one-level-deep/file-2.md',
    icon: 'document',
    type: 'item',
  },
  {
    depth: 1,
    name: 'Two Levels Deep',
    type: 'group',
    icon: 'folder-close',
  },
  {
    depth: 2,
    name: 'Two levels Deep - 1',
    srn: 'gh/stoplightio/studio/docs/one-level-deep/two-levels-deep/file-1.md',
    icon: 'document',
    type: 'item',
  },
  {
    depth: 2,
    name: 'Two levels Deep - 2',
    srn: 'gh/stoplightio/studio/docs/one-level-deep/two-levels-deep/file-2.md',
    icon: 'document',
    type: 'item',
  },
  {
    depth: 2,
    name: 'Three Levels Deep',
    type: 'group',
    icon: 'folder-close',
  },
  {
    depth: 3,
    name: 'Four Levels Deep',
    type: 'group',
    icon: 'folder-close',
  },
  {
    depth: 4,
    name: 'Four levels Deep - 1',
    srn: 'gh/stoplightio/studio/docs/one-level-deep/two-levels-deep/three-levels-deep/four-levels-deep/file-1.md',
    icon: 'document',
    type: 'item',
  },
  {
    depth: 4,
    name: 'Four levels Deep - 2',
    srn: 'gh/stoplightio/studio/docs/one-level-deep/two-levels-deep/three-levels-deep/four-levels-deep/file-2.md',
    icon: 'document',
    type: 'item',
  },
];

export const nodeTypeIcons: IContentsNode[] = [
  {
    depth: 0,
    name: 'One Level Deep',
    type: 'group',
  },
  {
    depth: 1,
    name: 'One level Deep - 1',
    srn: 'gh/stoplightio/studio/docs/one-level-deep/file-1.md',
    icon: 'cube',
    type: 'item',
  },
  {
    depth: 1,
    name: 'One level Deep - 2',
    srn: 'gh/stoplightio/studio/docs/one-level-deep/file-2.md',
    icon: 'cube',
    type: 'item',
  },
  {
    depth: 1,
    name: 'Two Levels Deep',
    type: 'group',
  },
  {
    depth: 2,
    name: 'Two levels Deep - 1',
    srn: 'gh/stoplightio/studio/docs/one-level-deep/two-levels-deep/file-1.md',
    icon: 'cube',
    type: 'item',
  },
  {
    depth: 2,
    name: 'Two levels Deep - 2',
    srn: 'gh/stoplightio/studio/docs/one-level-deep/two-levels-deep/file-2.md',
    icon: 'cube',
    type: 'item',
  },
  {
    depth: 2,
    name: 'Three Levels Deep',
    type: 'group',
  },
  {
    depth: 3,
    name: 'Four Levels Deep',
    type: 'group',
  },
  {
    depth: 4,
    name: 'Four levels Deep - 1',
    srn: 'gh/stoplightio/studio/docs/one-level-deep/two-levels-deep/three-levels-deep/four-levels-deep/file-1.md',
    icon: 'cube',
    type: 'item',
  },
  {
    depth: 4,
    name: 'Four levels Deep - 2',
    srn: 'gh/stoplightio/studio/docs/one-level-deep/two-levels-deep/three-levels-deep/four-levels-deep/file-2.md',
    icon: 'cube',
    type: 'item',
  },
];
