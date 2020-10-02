import * as React from 'react';

import { IPropertyPath } from '../../../AST/PropertyPath';
import { useSelection } from './utils';

export const Path: React.FunctionComponent<{
  data?: IPropertyPath;
}> = ({ data }) => {
  const selection = useSelection(data);
  if (!data) return null;

  return (
    <div className="HttpOperation__Path flex-1 font-medium text-gray-6 dark:text-gray-3 break-all" {...selection}>
      {data.value}
    </div>
  );
};
