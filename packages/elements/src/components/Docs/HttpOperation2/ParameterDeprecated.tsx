import { Tag } from '@stoplight/ui-kit';
import * as React from 'react';

import { IPropertyDeprecated } from '../../../AST/PropertyDeprecated';
import { useSelection } from './utils';

export const ParameterDeprecated: React.FunctionComponent<{
  data?: IPropertyDeprecated;
}> = ({ data }) => {
  const selection = useSelection(data);
  if (!data || !data.value) return null;

  return (
    <Tag className="mt-2 mr-2" intent="warning" minimal {...selection}>
      Deprecated
    </Tag>
  );
};
