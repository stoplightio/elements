import { Classes } from '@blueprintjs/core';
import cn from 'classnames';
import * as React from 'react';

export const PageSkeleton: React.FunctionComponent<{ className?: string; padding?: string }> = ({
  className,
  padding = '12',
}) => {
  return (
    <div className={cn('PageSkeleton', className, `p-${padding}`, 'flex flex-col h-full')}>
      <div className={cn(Classes.SKELETON, 'h-12 w-1/5')} />
      <div className={cn(Classes.SKELETON, 'h-12 my-6')} />
      <div className={cn(Classes.SKELETON, 'flex-1 my-6')} />
    </div>
  );
};
