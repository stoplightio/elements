import { Classes } from '@blueprintjs/core';
import cn from 'classnames';
import * as React from 'react';

import {
  ITableOfContents as ITableOfContentsComponent,
  TableOfContents as TableOfContentsComponent,
} from '../components/TableOfContents';
import { useComputeTree } from '../hooks/useComputeTree';
import { useProjectToc } from '../hooks/useProjectToc';

export interface ITableOfContents extends Pick<ITableOfContentsComponent, 'className'> {
  srn: string;
  activeNodeSrn?: string;
}

export const TableOfContents: React.FunctionComponent<ITableOfContents> = ({ srn, activeNodeSrn, className }) => {
  const [res] = useProjectToc(srn);
  const tree = useComputeTree(res.data ? res.data.contents : [], activeNodeSrn);

  if (res.isLoading) {
    return <TableOfContentsSkeleton />;
  }

  if (res.error) {
    console.error(res.error);
    return <>Error loading resource. Check the developer console for more information.</>;
  }

  if (!res.data) {
    return <>Not Found</>;
  }

  return <TableOfContentsComponent className={className} tree={tree} />;
};

export const TableOfContentsSkeleton: React.FunctionComponent<{ className?: string }> = ({ className }) => {
  return (
    <div className={className}>
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
  );
};

const SkeletonRow = () => (
  <div className="flex items-center mt-2 h-8">
    <div className={cn(Classes.SKELETON, 'w-2 h-2 mr-2')} />
    <div className={cn(Classes.SKELETON, 'w-3 h-4 mr-2')} />
    <div className={cn(Classes.SKELETON, 'w-32 h-5')} />
  </div>
);
