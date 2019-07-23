import cn from 'classnames';
import * as React from 'react';
import { HttpMethodColors } from '../../utils/http';

export const Method: React.FunctionComponent<{
  className?: string;
  method: string;
}> = ({ className, method }) => {
  return (
    <span
      className={cn(
        'HttpOperation__Method',
        className,
        'bp3-tag bp3-round',
        HttpMethodColors[method] ? `bp3-intent-${HttpMethodColors[method]}` : '',
      )}
    >
      <span className="bp3-text-overflow-ellipsis bp3-fill flex items-center text-xl p-2">{method.toUpperCase()}</span>
    </span>
  );
};
