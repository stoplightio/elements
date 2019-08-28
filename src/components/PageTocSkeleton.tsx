import { Classes } from '@stoplight/ui-kit';
import cn from 'classnames';
import React from 'react';

export const PageTocSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div>
      <h6 className="ml-3 mb-2">Table of Contents</h6>
      <ul className={cn('border dark:border-lighten-4 p-3 bg-gray-1 m-3 w-full', className)}>
        <li className={cn(Classes.SKELETON, 'h-6 w-1/5')} />
        <li className={cn(Classes.SKELETON, 'h-6 my-4')} />
        <li className={cn(Classes.SKELETON, 'h-6 w-3/4 my-4')} />
        <li className={cn(Classes.SKELETON, 'h-6 my-4')} />
        <li className={cn(Classes.SKELETON, 'h-6 w-1/2 mt-4 mb-2')} />
      </ul>
    </div>
  );
};
