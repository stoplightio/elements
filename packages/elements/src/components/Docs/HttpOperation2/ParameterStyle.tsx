import { HttpParamStyles } from '@stoplight/types';
import { Tag } from '@stoplight/ui-kit';
import * as React from 'react';

import { IStyle } from '../../../AST/leafs/Style';
import { useSelection } from './utils';

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
  const selection = useSelection(data);
  if (!data) return null;

  return (
    <Tag className="mt-2 mr-2" minimal {...selection}>
      {readableStyles[data.value] || data.value}
    </Tag>
  );
};
