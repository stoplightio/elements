import cn from 'classnames';
import * as React from 'react';

import { TableOfContents } from '../components/TableOfContents';
import { useComputeTree } from '../hooks/useComputeTree';
import { useProjectToc } from '../hooks/useProjectToc';
import { Page, PageSkeleton } from './Page';
import { TableOfContentsSkeleton } from './TableOfContents';

export interface IHub {
  srn: string;
  className?: string;
}

export const Hub: React.FunctionComponent<IHub> = ({ srn, className }) => {
  const [{ isLoading, data }] = useProjectToc(srn);
  const tree = useComputeTree(data ? data.contents : [], srn);

  const [service, org, project, ...uri] = srn.split('/');

  return (
    <div className={cn(className, 'flex flex-1')}>
      <div className="border-r dark:border-darken-4" style={{ width: 300 }}>
        {isLoading ? <TableOfContentsSkeleton className="pt-10" /> : <TableOfContents className="pt-10" tree={tree} />}
      </div>

      {uri.length ? (
        <Page className="flex-1 pt-10" srn={srn} />
      ) : isLoading ? (
        <PageSkeleton className="flex-1" />
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
};
