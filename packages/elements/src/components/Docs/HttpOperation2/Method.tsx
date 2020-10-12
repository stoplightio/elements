import cn from 'classnames';
import * as React from 'react';

import { IHttpMethod } from '../../../AST/leafs/HttpMethod';
import { HttpMethodColors } from '../../../constants';
import { useClasses } from './useClasses';
import { useClick } from './useClick';
import { useStyle } from './useStyle';

export const Method: React.FunctionComponent<{
  data?: IHttpMethod;
}> = ({ data }) => {
  const classes = useClasses(data);
  const style = useStyle(data);
  const notify = useClick(data);
  if (!data) return null;

  const color = (data.value && HttpMethodColors[data.value]) || 'gray';
  return (
    <div
      className={cn(
        `HttpOperation__Method uppercase mr-5 font-semibold border rounded py-1 px-2`,
        `text-${color}`,
        `border-${color}`,
        classes,
      )}
      style={style}
      onClick={notify}
    >
      {data.value || 'UNKNOWN'}
    </div>
  );
};
