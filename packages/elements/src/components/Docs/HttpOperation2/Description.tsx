import * as React from 'react';

import { IDescription } from '../../../AST/leafs/Description';
import { MarkdownViewer } from '../../MarkdownViewer';
import { useSelection } from './utils';

export const Description: React.FunctionComponent<{
  data?: IDescription;
}> = ({ data }) => {
  const selection = useSelection(data);

  return (
    <MarkdownViewer
      className="HttpOperation__Description mb-10 ml-1"
      markdown={data?.value || '*No description.*'}
      {...selection}
    />
  );
};
