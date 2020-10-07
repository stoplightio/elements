import { Tag } from '@stoplight/ui-kit';
import * as React from 'react';

import { IDeprecated } from '../../../AST/leafs/Deprecated';
import { useSelection } from './utils';

export const ParameterDeprecated: React.FunctionComponent<{
  data?: IDeprecated;
}> = ({ data }) => {
  const selection = useSelection(data);
  if (!data || !data.value) return null;

  return (
    <Tag className="mt-2 mr-2" intent="warning" minimal {...selection}>
      Deprecated
    </Tag>
  );
};
