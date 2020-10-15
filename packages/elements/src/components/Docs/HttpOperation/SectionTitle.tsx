import cn from 'classnames';
import * as React from 'react';

export interface ISectionTitle {
  title: string;
  className?: string;
  onClick?: React.MouseEventHandler;
}

export const SectionTitle: React.FunctionComponent<ISectionTitle> = ({ title, className, onClick }) => {
  return (
    <div
      className={cn(
        'SectionTitle pl-1 pb-3 text-lg font-medium text-gray-7 dark:text-gray-4 border-b-2 dark:border-gray-6',
        className,
      )}
      onClick={onClick}
    >
      {title}
    </div>
  );
};
