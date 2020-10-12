import { Tag } from '@stoplight/ui-kit';
import cn from 'classnames';
import * as React from 'react';

import { IDeprecated } from '../../../AST/leafs/Deprecated';
import { useClasses } from './useClasses';
import { useClick } from './useClick';
import { useStyle } from './useStyle';

export const ParameterDeprecated: React.FunctionComponent<{
  data?: IDeprecated;
}> = ({ data }) => {
  const classes = useClasses(data);
  const style = useStyle(data);
  const notify = useClick(data);
  if (!data || !data.value) return null;

  return (
    <Tag className={cn('mt-2 mr-2', classes)} style={style} onClick={notify} intent="warning" minimal>
      Deprecated
    </Tag>
  );
};
