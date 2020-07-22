import { FAIcon, FAIconProp } from '@stoplight/ui-kit';
import cn from 'classnames';
import * as React from 'react';

export interface ISectionTitle {
  title: string;
  className?: string;
  icon?: FAIconProp;
}

export const SectionTitle: React.FunctionComponent<ISectionTitle> = ({ title, className, icon }) => {
  return (
    <div
      className={cn(
        'SectionTitle pl-1 pb-3 text-lg font-medium text-gray-7 dark:text-gray-4 border-b-2 dark:border-gray-6',
        className,
      )}
    >
      {icon && <FAIcon icon={icon} className="mr-2 text-gray-6 dark:text-gray-5" />}

      {title}
    </div>
  );
};
