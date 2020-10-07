import cn from 'classnames';
import * as React from 'react';

import { ICookieParams } from '../../../AST/CookieParams';
import { IHeaderParams } from '../../../AST/HeaderParams';
import { IPathParams } from '../../../AST/PathParams';
import { IQueryParams } from '../../../AST/QueryParams';
import { Parameter } from './Parameter';
import { SectionTitle } from './SectionTitle';
import { useSelection } from './utils';

export interface IParametersProps {
  data?: IQueryParams | IPathParams | ICookieParams | IHeaderParams;
}

export const Parameters: React.FunctionComponent<IParametersProps> = ({ data }) => {
  const selection = useSelection(data);
  if (!data) return null;

  const title =
    data.type === 'cookieParams'
      ? 'Cookie Parameters'
      : data.type === 'headerParams'
      ? 'Header Parameters'
      : data.type === 'pathParams'
      ? 'Path Parameters'
      : data.type === 'queryParams'
      ? 'Query Parameters'
      : '';

  if (!data?.children || !data.children.length) return null;

  const children = [];
  for (const child of data.children) {
    children.push(
      <Parameter
        key={child.id}
        data={child}
        className={cn('pt-4', {
          'pb-4': child !== data.children[data.children.length - 1],
          'border-t border-gray-2 dark:border-gray-6': child !== data.children[0],
        })}
      />,
    );
  }
  return (
    <div className={cn('HttpOperation__Parameters', 'mb-10')} {...selection}>
      <SectionTitle title={title} />
      {children}
    </div>
  );
};
Parameters.displayName = 'HttpOperation.Parameters';
