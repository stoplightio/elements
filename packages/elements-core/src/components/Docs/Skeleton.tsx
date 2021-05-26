import cn from 'classnames';
import * as React from 'react';

export const DocsSkeleton = ({ className, padding = '12' }: { className?: string; padding?: string }) => {
  return (
    <div className={cn('PageSkeleton', className, `p-${padding}`, 'flex flex-col h-full')}>
      <div className={cn('DocsSkeleton h-12 w-1/5')} />
      <div className={cn('DocsSkeleton h-12 my-6')} />
      <div className={cn('DocsSkeleton flex-1 my-6')} />
    </div>
  );
};
