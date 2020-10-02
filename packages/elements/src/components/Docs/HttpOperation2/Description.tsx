import * as React from 'react';

import { IPropertyDescription } from '../../../AST/PropertyDescription';
import { MarkdownViewer } from '../../MarkdownViewer';
import { useSelection } from './utils';

export const Description: React.FunctionComponent<{
  data?: IPropertyDescription;
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
