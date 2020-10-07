import * as React from 'react';

import { IName } from '../../../AST/leafs/Name';
import { useSelection } from './utils';

export interface IParameterNameProps {
  data?: IName;
}

export const ParameterName: React.FunctionComponent<IParameterNameProps> = ({ data }) => {
  const selection = useSelection(data);
  if (!data) return null;

  return (
    <div className="font-medium font-mono" {...selection}>
      {data.value}
    </div>
  );
};
