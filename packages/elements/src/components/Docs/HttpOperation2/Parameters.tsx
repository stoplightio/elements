import cn from 'classnames';
import * as React from 'react';

import { ICookieParams } from '../../../AST/CookieParams';
import { IHeaderParams } from '../../../AST/HeaderParams';
import { IPathParams } from '../../../AST/PathParams';
import { IQueryParams } from '../../../AST/QueryParams';
import { Parameter } from './Parameter';
import { SectionTitle } from './SectionTitle';
import { useClasses } from './useClasses';
import { useClick } from './useClick';

export interface IParametersProps {
  data?: IQueryParams | IPathParams | ICookieParams | IHeaderParams;
}

const titles = {
  cookieParams: 'Cookie Parameters',
  headerParams: 'Header Parameters',
  pathParams: 'Path Parameters',
  queryParams: 'Query Parameters',
};

export const Parameters: React.FunctionComponent<IParametersProps> = ({ data }) => {
  const classes = useClasses(data);
  const notify = useClick(data);
  if (!data) return null;

  const title = titles[data.type] || '';

  if (!data?.children || !data.children.length) return null;

  const children = [];
  for (const child of data.children) {
    children.push(
      <Parameter
        key={child.id}
        data={child}
        context={data.type}
        className={cn('pt-4', {
          'pb-4': child !== data.children[data.children.length - 1],
          'border-t border-gray-2 dark:border-gray-6': child !== data.children[0],
        })}
      />,
    );
  }
  return (
    <div className={cn('HttpOperation__Parameters', 'mb-10', classes)}>
      <SectionTitle title={title} onClick={notify} />
      {children}
    </div>
  );
};
Parameters.displayName = 'HttpOperation.Parameters';
