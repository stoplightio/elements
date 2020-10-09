import cn from 'classnames';
import * as React from 'react';

import { IDescription } from '../../../AST/leafs/Description';
import { MarkdownViewer } from '../../MarkdownViewer';
import { useClasses } from './useClasses';
import { useClick } from './useClick';

export const ResponseDescription: React.FunctionComponent<{
  data?: IDescription;
}> = ({ data }) => {
  const classes = useClasses(data);
  const notify = useClick(data);

  return (
    <MarkdownViewer
      className={cn('HttpOperation__Description ml-1 mb-6', classes)}
      markdown={data?.value || '*No description.*'}
      onClick={notify}
    />
  );
};
