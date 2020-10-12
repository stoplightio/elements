import cn from 'classnames';
import * as React from 'react';

import { IName } from '../../../AST/leafs/Name';
import { useClasses } from './useClasses';
import { useClick } from './useClick';
import { useStyle } from './useStyle';

export interface IParameterNameProps {
  data?: IName;
}

export const ParameterName: React.FunctionComponent<IParameterNameProps> = ({ data }) => {
  const classes = useClasses(data);
  const style = useStyle(data);
  const notify = useClick(data);
  if (!data) return null;

  return (
    <div className={cn('font-medium font-mono', classes)} style={style} onClick={notify}>
      {data.value}
    </div>
  );
};
