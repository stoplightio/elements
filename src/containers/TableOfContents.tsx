import { Classes } from '@blueprintjs/core';
import cn from 'classnames';
import * as React from 'react';
import { TableOfContents as TableOfContentsComponent } from '../components/TableOfContents';
import { useComputeToc } from '../hooks/useComputeToc';
import { useProjectNodes } from '../hooks/useProjectNodes';

export interface ITableOfContents {
  srn: string;
  activeNodeSrn?: string;
  className?: string;
}

export const TableOfContents: React.FunctionComponent<ITableOfContents> = ({ srn, className }) => {
  const res = useProjectNodes(srn);
  const contents = useComputeToc(res.data ? res.data.items : []);

  if (res.isLoading) {
    return <TableOfContentsSkeleton className={className} />;
  }

  if (res.error) {
    console.error(res.error);
    return <>Error loading resource. Check the developer console for more information.</>;
  }

  if (!res.data) {
    return <>Not Found</>;
  }

  return <TableOfContentsComponent className={className} contents={contents} />;
};

export const TableOfContentsSkeleton: React.FunctionComponent<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn('TableOfContentsSkeleton bg-gray-1 dark:bg-transparent flex justify-end py-10', className)}>
      <div className="TableOfContentsSkeleton-inner">
        <SkeletonRow />
        <SkeletonRow />

        <div className="pl-4">
          <SkeletonRow />

          <div className="pl-6">
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </div>
        </div>

        <SkeletonRow />
        <SkeletonRow />
        <SkeletonRow />

        <div className="pl-4">
          <SkeletonRow />

          <div className="pl-6">
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </div>
        </div>

        <SkeletonRow />
        <SkeletonRow />
        <SkeletonRow />

        <div className="pl-4">
          <SkeletonRow />

          <div className="pl-6">
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </div>
        </div>

        <SkeletonRow />
      </div>
    </div>
  );
};

const SkeletonRow = () => (
  <div className="flex items-center mt-2 h-10">
    <div className={cn(Classes.SKELETON, 'px-24 py-4')} />
  </div>
);
