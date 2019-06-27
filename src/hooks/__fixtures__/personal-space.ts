import { TreeNode } from '../../components/TableOfContents';
import { ITableOfContentsNode } from '../../utils/node';

export const nodes: ITableOfContentsNode[] = [
  {
    id: 1,
    type: 'article',
    name: 'Introduction',
    srn: 'sl/stoplightio/hubs/docs/introduction.md',
    version: '1',
    versionId: 1,
    parentId: undefined,
    tags: [],
  },
];

export const tree: TreeNode[] = [
  {
    id: 1,
    label: 'Introduction',
    nodeData: nodes[0],
    childNodes: [],
  },
];
