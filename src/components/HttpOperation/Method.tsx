import cn from 'classnames';
import * as React from 'react';
import { HttpMethodColors } from '../../utils/http';

export const Method: React.FunctionComponent<{
  className?: string;
  method: string;
}> = ({ className, method }) => {
  return (
    <span className={cn('HttpOperation__Method uppercase', `text-${HttpMethodColors[method]}`, className)}>
      {method.toUpperCase()}
    </span>
  );
};
