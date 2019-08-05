import cn from 'classnames';
import * as React from 'react';
import { PageSkeleton } from '../components/PageSkeleton';
import { TableOfContents } from '../components/TableOfContents';
import { TableOfContentsSkeleton } from '../components/TableOfContentsSkeleton';
import { useComputeToc } from '../hooks/useComputeToc';
import { useProjectNodes } from '../hooks/useProjectNodes';
import { IContentsNode } from '../types';
import { deserializeSrn } from '../utils/srns';
import { Page } from './Page';

export interface IHub {
  srn: string;
  className?: string;
  padding?: string;
}

export const Hub: React.FunctionComponent<IHub> = ({ srn, className, padding = '10' }) => {
  const { isLoading, data } = useProjectNodes(srn);
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

  return (
    <div className={cn('Hub flex', className)}>
      {isLoading ? (
        <TableOfContentsSkeleton padding={padding} />
      ) : (
        <TableOfContents items={data ? data.items : []} srn={pageSrn} padding={padding} />
      )}

      {pageSrn ? (
        <Page className="flex-1 border-l dark:border-darken-4" srn={pageSrn} padding={padding} scrollInnerContainer />
      ) : (
        <PageSkeleton className="flex-1 border-l dark:border-darken-4" padding={padding} />
      )}
    </div>
  );
};

function findFirstNode(nodes: IContentsNode[]): IContentsNode {
  return nodes.find(node => !!node.srn) || nodes[0];
}
