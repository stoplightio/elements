import cn from 'classnames';
import * as React from 'react';

import { IDescription } from '../../../AST/leafs';
import { MarkdownViewer } from '../../MarkdownViewer';
import { useClasses } from './useClasses';
import { useClick } from './useClick';
import { useStyle } from './useStyle';

export interface IRequestBodyDescriptionProps {
  data?: IDescription;
}

export const RequestBodyDescription = ({ data }: IRequestBodyDescriptionProps) => {
  const classes = useClasses(data);
  const style = useStyle(data);
  const notify = useClick(data);
  if (!data) return null;
  return <MarkdownViewer markdown={data.value} className={cn('mt-6', classes)} style={style} onClick={notify} />;
};
