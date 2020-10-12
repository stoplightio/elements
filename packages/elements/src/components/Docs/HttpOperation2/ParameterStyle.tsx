import { HttpParamStyles } from '@stoplight/types';
import { Tag } from '@stoplight/ui-kit';
import cn from 'classnames';
import * as React from 'react';

import { IStyle } from '../../../AST/leafs/Style';
import { useClasses } from './useClasses';
import { useClick } from './useClick';
import { useStyle } from './useStyle';

const readableStyles = {
  [HttpParamStyles.PipeDelimited]: 'Pipe separated values',
  [HttpParamStyles.SpaceDelimited]: 'Space separated values',
  [HttpParamStyles.CommaDelimited]: 'Comma separated values',
  [HttpParamStyles.Simple]: 'Comma separated values',
  [HttpParamStyles.Matrix]: 'Path style values',
  [HttpParamStyles.Label]: 'Label style values',
  [HttpParamStyles.Form]: 'Form style values',
} as const;

export const ParameterStyle: React.FunctionComponent<{
  data?: IStyle;
}> = ({ data }) => {
  const classes = useClasses(data);
  const style = useStyle(data);
  const notify = useClick(data);
  if (!data) return null;

  return (
    <Tag className={cn('mt-2 mr-2', classes)} style={style} minimal onClick={notify}>
      {readableStyles[data.value] || data.value}
    </Tag>
  );
};
