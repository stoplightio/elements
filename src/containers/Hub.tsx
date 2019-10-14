import cn from 'classnames';
import * as React from 'react';
import { PageSkeleton } from '../components/PageSkeleton';
import { TableOfContents } from '../components/TableOfContents';
import { TableOfContentsSkeleton } from '../components/TableOfContentsSkeleton';
import { useComputeToc } from '../hooks/useComputeToc';
import { useProjectNodes } from '../hooks/useProjectNodes';
import { IContentsNode, IProjectNode } from '../types';
import { deserializeSrn } from '../utils/srns';
import { IPageContainer, Page } from './Page';

export interface IHub {
  srn: string;
  tabs: IPageContainer['tabs'];
  className?: string;
  padding?: string;
  NotFoundComponent?: React.FC<{ srn: string; error?: { message: string }; items: IProjectNode[] }>;
}

export const Hub: React.FC<IHub> = ({ srn, tabs, className, padding = '12', NotFoundComponent }) => {
  const { isLoading, data, error } = useProjectNodes(srn);
  const contents = useComputeToc(data ? data.items : []);

  const { uri } = deserializeSrn(srn);

  let pageSrn;
  if (uri) {
    pageSrn = srn;
  } else {
    const node = findFirstNode(contents);
    if (node && node.srn) {
      pageSrn = node.srn;
    }
  }

  // Show not found if we're done loading but have no contents to render
  if (NotFoundComponent && !isLoading && !contents.length) {
    // Pass "items" to parent to determine if there are nodes that don't conform to the "/docs" or "/reference" folder convention
    return <NotFoundComponent srn={srn} error={error} items={data ? data.items : []} />;
  }

  return (
    <div className={cn('Hub flex w-full', className)}>
      {isLoading ? (
        <TableOfContentsSkeleton padding={padding} />
      ) : (
        <TableOfContents contents={contents} srn={pageSrn} padding={padding} />
      )}

      {pageSrn ? (
        <Page
          className="flex-1 border-l dark:border-darken-4"
          srn={pageSrn}
          tabs={tabs}
          padding={padding}
          scrollInnerContainer
        />
      ) : (
        <PageSkeleton className="flex-1 border-l dark:border-darken-4" padding={padding} />
      )}
    </div>
  );
};

function findFirstNode(nodes: IContentsNode[]): IContentsNode {
  return nodes.find(node => !!node.srn) || nodes[0];
}
