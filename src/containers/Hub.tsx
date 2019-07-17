import cn from 'classnames';
import * as React from 'react';

import { TableOfContents } from '../components/TableOfContents';
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

  return (
    <div className={cn('Hub', className, 'flex flex-1')}>
      {isLoading ? <TableOfContentsSkeleton className="pt-10" /> : <TableOfContents className="pt-10" tree={tree} />}

      {uri ? (
        <Page className="flex-1 bg-white dark:bg-transparent border dark:border-darken-4" srn={srn} />
      ) : isLoading ? (
        <PageSkeleton className="flex-1" />
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
};
