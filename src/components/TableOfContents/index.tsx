import { Dictionary } from '@stoplight/types';
import { ITreeNode, Tree } from '@stoplight/ui-kit';
import { ScrollContainer } from '@stoplight/ui-kit/ScrollContainer';
import * as React from 'react';

import { TreeNodeClickContext } from '../../containers/Provider';
import { ITableOfContentsNode } from '../../utils/node';

export type TreeNode = ITreeNode<ITableOfContentsNode>;

export interface ITableOfContents {
  tree: TreeNode[];

  className?: string;
}

export const TableOfContents: React.FunctionComponent<ITableOfContents> = ({ tree, className }) => {
  const [collapsed, setCollapsed] = React.useState<Dictionary<boolean>>({});
  const onTreeNodeClick = React.useContext(TreeNodeClickContext);

  const contents = React.useMemo(() => {
    forEachNode(tree, n => {
      n.isExpanded = !collapsed[n.id];
    });

    return tree;
  }, [tree, collapsed]);

  const onNodeClick = React.useCallback(
    (node, nodePath, e) => {
      if (node.childNodes && node.childNodes.length) {
        setCollapsed({ ...collapsed, [node.id]: !collapsed[node.id] });
      } else {
        e.preventDefault();
        onTreeNodeClick(node);
      }
    },
    [collapsed, onTreeNodeClick],
  );
  const onNodeCollapse = React.useCallback(node => setCollapsed({ ...collapsed, [node.id]: true }), [collapsed]);
  const onNodeExpand = React.useCallback(node => setCollapsed({ ...collapsed, [node.id]: false }), [collapsed]);

  return (
    <ScrollContainer>
      <Tree
        className={className}
        contents={contents}
        onNodeClick={onNodeClick}
        onNodeCollapse={onNodeCollapse}
        onNodeExpand={onNodeExpand}
      />
    </ScrollContainer>
  );
};

const forEachNode = (nodes: any, callback: (node: any) => void) => {
  if (!nodes) return;

  for (const node of nodes) {
    callback(node);
    forEachNode(node.childNodes, callback);
  }
};
