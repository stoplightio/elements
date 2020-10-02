import cn from 'classnames';
import * as React from 'react';

import { IPropertyMethod } from '../../../AST/PropertyMethod';
import { HttpMethodColors } from '../../../constants';
import { useSelection } from './utils';

export const Method: React.FunctionComponent<{
  data?: IPropertyMethod;
}> = ({ data }) => {
  const selection = useSelection(data);
  if (!data) return null;

  const color = (data.value && HttpMethodColors[data.value]) || 'gray';
  return (
    <div
      className={cn(
        `HttpOperation__Method uppercase mr-5 font-semibold border rounded py-1 px-2`,
        `text-${color}`,
        `border-${color}`,
      )}
      {...selection}
    >
      {data.value || 'UNKNOWN'}
    </div>
  );
};
