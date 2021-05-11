import cn from 'classnames';
import * as React from 'react';

export const Path: React.FunctionComponent<{
  path: string;

  host?: string;
  className?: string;
}> = ({ className, host, path }) => {
  if (!host && !path) return null;

  return (
    <div
      className={cn(
        'HttpOperation__Path',
        className,
        'inline-flex items-center bg-darken-2 py-2 px-3 rounded select-all',
      )}
    >
      {host && <div className="text-darken-7 dark:text-gray-6 mr-1">{host}</div>}
      <div className="font-semibold">{path}</div>
    </div>
  );
};
