import cn from 'classnames';
import * as React from 'react';

import { IPath } from '../../../AST/leafs/Path';
import { useClasses } from './useClasses';
import { useClick } from './useClick';

export const Path: React.FunctionComponent<{
  data?: IPath;
}> = ({ data }) => {
  const classes = useClasses(data);
  const notify = useClick(data);
  if (!data) return null;

  return (
    <div
      className={cn('HttpOperation__Path flex-1 font-medium text-gray-6 dark:text-gray-3 break-all', classes)}
      onClick={notify}
    >
      {data.value}
    </div>
  );
};
