import cn from 'classnames';
import * as React from 'react';

import { IRequired } from '../../../AST/leafs/Required';
import { useSelection } from './utils';

export interface IParameterRequiredProps {
  data?: IRequired;
}

export const ParameterRequired: React.FunctionComponent<IParameterRequiredProps> = ({ data }) => {
  const selection = useSelection(data);
  if (!data) return null;

  return (
    <div
      className={cn('ml-2 text-sm', {
        'text-danger': data.value,
        'opacity-50': !data.value,
      })}
      {...selection}
    >
      {data.value ? 'required' : 'optional'}
    </div>
  );
};
