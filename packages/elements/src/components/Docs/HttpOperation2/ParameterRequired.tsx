import cn from 'classnames';
import * as React from 'react';

import { IRequired } from '../../../AST/leafs/Required';
import { useClasses } from './useClasses';
import { useClick } from './useClick';
import { useStyle } from './useStyle';

export interface IParameterRequiredProps {
  data?: IRequired;
}

export const ParameterRequired: React.FunctionComponent<IParameterRequiredProps> = ({ data }) => {
  const classes = useClasses(data);
  const style = useStyle(data);
  const notify = useClick(data);
  if (!data) return null;

  return (
    <div
      className={cn(
        'ml-2 text-sm',
        {
          'text-danger': data.value,
          'opacity-50': !data.value,
        },
        classes,
      )}
      style={style}
      onClick={notify}
    >
      {data.value ? 'required' : 'optional'}
    </div>
  );
};
