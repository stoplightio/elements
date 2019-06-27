import { Dictionary } from '@stoplight/types';
import { ITreeNode, Tree } from '@stoplight/ui-kit';
import { ScrollContainer } from '@stoplight/ui-kit/ScrollContainer';
import * as React from 'react';

import { ITableOfContentsNode } from '../../utils/node';

export type TreeNode = ITreeNode<ITableOfContentsNode>;

export interface ITableOfContents {
  tree: TreeNode[];
  onClick(node: TreeNode): void;

  className?: string;
}

export const TableOfContents: React.FunctionComponent<ITableOfContents> = ({ tree, onClick, className }) => {
  const [collapsed, setCollapsed] = React.useState<Dictionary<boolean>>({});

  const onNodeClick = React.useCallback(
    node => {
      if (node.childNodes && node.childNodes.length) {
        setCollapsed({ ...collapsed, [node.id]: !collapsed[node.id] });
      } else {
        onClick(node);
      }
    },
    [collapsed, onClick],
  );
  const onNodeCollapse = React.useCallback(node => setCollapsed({ ...collapsed, [node.id]: true }), [collapsed]);
  const onNodeExpand = React.useCallback(node => setCollapsed({ ...collapsed, [node.id]: false }), [collapsed]);

  return (
    <ScrollContainer>
      <Tree
        className={className}
        contents={tree}
        onNodeClick={onNodeClick}
        onNodeCollapse={onNodeCollapse}
        onNodeExpand={onNodeExpand}
      />
    </ScrollContainer>
  );
};
