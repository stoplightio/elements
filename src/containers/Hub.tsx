import cn from 'classnames';
import * as React from 'react';

import { ITreeNode } from '@blueprintjs/core';
import { TableOfContents, TreeNode } from '../components/TableOfContents';
import { useComputeTree } from '../hooks/useComputeTree';
import { useProjectToc } from '../hooks/useProjectToc';
import { deserializeSrn } from '../utils/srns';
import { Page, PageSkeleton } from './Page';
import { TableOfContentsSkeleton } from './TableOfContents';

export interface IHub {
  srn: string;
  className?: string;
}

export const Hub: React.FunctionComponent<IHub> = ({ srn, className }) => {
  const [{ isLoading, data }] = useProjectToc(srn);
  const tree = useComputeTree(data ? data.contents : [], srn);

  const { uri } = deserializeSrn(srn);
  let pageSrn;
  if (uri) {
    pageSrn = srn;
  } else {
    const node = findFirstNode(tree);
    if (node && node.nodeData) {
      pageSrn = node.nodeData.srn;
    }
  }

  return (
    <div className={cn('Hub', className, 'flex flex-1')}>
      {isLoading ? <TableOfContentsSkeleton className="pt-10" /> : <TableOfContents className="pt-10" tree={tree} />}

      {pageSrn ? (
        <Page className="flex-1 bg-white dark:bg-transparent border dark:border-darken-4" srn={pageSrn} />
      ) : (
        <PageSkeleton className="flex-1" />
      )}
    </div>
  );
};

function findFirstNode(nodes: TreeNode[]): TreeNode | undefined {
  for (const node of nodes) {
    if (node && node.childNodes) {
      return findFirstNode(node.childNodes);
    }

    return node;
  }

  return;
}
