import { Classes } from '@blueprintjs/core';
import cn from 'classnames';
import * as React from 'react';

export const TableOfContentsSkeleton: React.FunctionComponent<{ className?: string; padding?: string }> = ({
  className,
  padding = '12',
}) => {
  return (
    <div
      className={cn(
        'TableOfContentsSkeleton bg-gray-1 dark:bg-transparent flex justify-end',
        className,
        `py-${padding}`,
      )}
    >
      <div className="TableOfContentsSkeleton__inner">
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

const SkeletonRow: React.FunctionComponent<{ className?: string }> = () => (
  <div className="flex items-center mt-2 h-10">
    <div className={cn(Classes.SKELETON, 'py-4')} />
  </div>
);
