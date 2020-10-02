import * as React from 'react';

import { IPropertyDescription } from '../../../AST/PropertyDescription';
import { MarkdownViewer } from '../../MarkdownViewer';
import { useSelection } from './utils';

export const ParameterDescription: React.FunctionComponent<{
  data?: IPropertyDescription;
}> = ({ data }) => {
  const selection = useSelection(data);

  return (
    <MarkdownViewer
      className="text-gray-7 dark:text-gray-4 mt-1"
      markdown={data?.value || '*No description.*'}
      {...selection}
    />
  );
};
