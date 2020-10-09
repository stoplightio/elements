import cn from 'classnames';
import * as React from 'react';

import { IName } from '../../../AST/leafs/Name';
import { useClasses } from './useClasses';
import { useClick } from './useClick';

export interface IParameterNameProps {
  data?: IName;
}

export const ParameterName: React.FunctionComponent<IParameterNameProps> = ({ data }) => {
  const classes = useClasses(data);
  const notify = useClick(data);
  if (!data) return null;

  return (
    <div className={cn('font-medium font-mono', classes)} onClick={notify}>
      {data.value}
    </div>
  );
};
