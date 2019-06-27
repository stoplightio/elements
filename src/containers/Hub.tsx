import { Classes, Spinner } from '@blueprintjs/core';
import * as React from 'react';

import { TableOfContents, TreeNode } from '../components/TableOfContents';
import { useComputeTree } from '../hooks/useComputeTree';
import { useProjectToc } from '../hooks/useProjectToc';
import { Page } from './Page';

export interface IHub {
  srn: string;
}

export const Hub: React.FunctionComponent<IHub> = ({ srn }) => {
  const [activeNodeSrn, setActiveNodeSrn] = React.useState();

  const onClick = React.useCallback(
    treeNode => {
      if (treeNode && treeNode.nodeData) {
        setActiveNodeSrn(treeNode.nodeData.srn);
      }
    },
    [setActiveNodeSrn],
  );

  const [res] = useProjectToc(srn);
  const tree = useComputeTree(res.data ? res.data.contents : [], {}, activeNodeSrn);

  React.useEffect(() => {
    if (activeNodeSrn) return;

    // Set the first node as active
    const node = getFirstNode(tree);
    if (node && node.nodeData && (node.nodeData as any).srn) {
      setActiveNodeSrn(node.nodeData.srn);
    }
  }, [res]);

  if (res.isLoading) {
    return (
      <div className="h-full flex flex-col">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <h1 className={Classes.HEADING}>{res.data && res.data.project.name}</h1>

      <div className="flex flex-1">
        <div className="sticky top-0 border-r bg-gray-1" style={{ width: 275 }}>
          <TableOfContents className="py-4" tree={tree} onClick={onClick} />
        </div>

        {activeNodeSrn ? <Page className="flex-1" srn={activeNodeSrn} /> : <div className="flex-1" />}
      </div>
    </div>
  );
};

const getFirstNode = (contents: TreeNode[]): TreeNode => {
  const node = contents[0];

  if (node && node.childNodes) {
    return getFirstNode(node.childNodes);
  }

  return node;
};
