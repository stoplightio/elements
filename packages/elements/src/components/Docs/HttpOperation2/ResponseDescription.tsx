import * as React from 'react';

import { IDescription } from '../../../AST/leafs/Description';
import { MarkdownViewer } from '../../MarkdownViewer';
import { useSelection } from './utils';

export const ResponseDescription: React.FunctionComponent<{
  data?: IDescription;
}> = ({ data }) => {
  const selection = useSelection(data);

  return (
    <MarkdownViewer
      className="HttpOperation__Description ml-1 mb-6"
      markdown={data?.value || '*No description.*'}
      {...selection}
    />
  );
};
