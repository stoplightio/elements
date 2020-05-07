import cn from 'classnames';
import * as React from 'react';

import { HttpMethodColors } from '../../../constants';

export const Method: React.FunctionComponent<{
  className?: string;
  method: string;
}> = ({ className, method }) => {
  return (
    <span
      className={cn(
        'HttpOperation__Method flex h-8 items-center mr-6 px-3 rounded text-white uppercase',
        `bg-${HttpMethodColors[method] || 'gray'} dark:bg-${HttpMethodColors[method]}`,
        className,
      )}
    >
      {method}
    </span>
  );
};
