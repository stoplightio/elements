import cn from 'classnames';
import * as React from 'react';

export const DocsSkeleton = ({ className, padding = '12' }: { className?: string; padding?: string }) => {
  return (
    <div className={cn('PageSkeleton', className, `sl-p-${padding}`, 'sl-flex sl-flex-col sl-h-full')}>
      <div className={cn('DocsSkeleton sl-h-12 sl-w-1/5')} />
      <div className={cn('DocsSkeleton sl-h-12 sl-my-6')} />
      <div className={cn('DocsSkeleton sl-flex-1 sl-my-6')} />
    </div>
  );
};
