import cn from 'classnames';
import * as React from 'react';

import { IDescription } from '../../../AST/leafs/Description';
import { MarkdownViewer } from '../../MarkdownViewer';
import { useClasses } from './useClasses';
import { useClick } from './useClick';
import { useStyle } from './useStyle';

export const ParameterDescription: React.FunctionComponent<{
  data?: IDescription;
}> = ({ data }) => {
  const classes = useClasses(data);
  const style = useStyle(data);
  const notify = useClick(data);

  return (
    <MarkdownViewer
      className={cn('text-gray-7 dark:text-gray-4 mt-1', classes)}
      style={style}
      markdown={data?.value || '*No description.*'}
      onClick={notify}
    />
  );
};
