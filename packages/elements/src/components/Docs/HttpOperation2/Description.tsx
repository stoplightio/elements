import cn from 'classnames';
import * as React from 'react';

import { IDescription } from '../../../AST/leafs/Description';
import { MarkdownViewer } from '../../MarkdownViewer';
import { useClasses } from './useClasses';
import { useClick } from './useClick';

export const Description: React.FunctionComponent<{
  data?: IDescription;
}> = ({ data }) => {
  const classes = useClasses(data);
  const notify = useClick(data);

  return (
    <MarkdownViewer
      className={cn('HttpOperation__Description mb-10 ml-1', classes)}
      markdown={data?.value || '*No description.*'}
      onClick={notify}
    />
  );
};
