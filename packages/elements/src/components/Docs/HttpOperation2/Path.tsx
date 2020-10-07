import * as React from 'react';

import { IPath } from '../../../AST/leafs/Path';
import { useSelection } from './utils';

export const Path: React.FunctionComponent<{
  data?: IPath;
}> = ({ data }) => {
  const selection = useSelection(data);
  if (!data) return null;

  return (
    <div className="HttpOperation__Path flex-1 font-medium text-gray-6 dark:text-gray-3 break-all" {...selection}>
      {data.value}
    </div>
  );
};
