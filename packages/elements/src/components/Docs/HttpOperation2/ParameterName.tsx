import * as React from 'react';

import { IPropertyName } from '../../../AST/PropertyName';
import { useSelection } from './utils';

export interface IParameterNameProps {
  data?: IPropertyName;
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
