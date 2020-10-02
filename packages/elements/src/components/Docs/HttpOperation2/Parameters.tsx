import { PropertyTypeColors } from '@stoplight/json-schema-viewer';
import { Dictionary, HttpParamStyles, Primitive } from '@stoplight/types';
import { Tag } from '@stoplight/ui-kit';
import cn from 'classnames';
import { capitalize, get, isEmpty, keys, omit, omitBy, pick, pickBy, sortBy } from 'lodash';
import * as React from 'react';

import { ICookieParam } from '../../../AST/CookieParam';
import { ICookieParams } from '../../../AST/CookieParams';
import { IHeaderParam } from '../../../AST/HeaderParam';
import { IHeaderParams } from '../../../AST/HeaderParams';
import { IPathParam } from '../../../AST/PathParam';
import { IPathParams } from '../../../AST/PathParams';
import { IPropertyDeprecated } from '../../../AST/PropertyDeprecated';
import { IPropertyDescription } from '../../../AST/PropertyDescription';
import { IPropertyName } from '../../../AST/PropertyName';
import { IPropertyRequired } from '../../../AST/PropertyRequired';
import { IPropertyStyle } from '../../../AST/PropertyStyle';
import { IQueryParam } from '../../../AST/QueryParam';
import { IQueryParams } from '../../../AST/QueryParams';
import { ISchema } from '../../../AST/Schema';
import { groupNodes } from '../../../AST/utils';
import { editHandle } from '../../../constants';
import { InlineRefResolverContext } from '../../../containers/Provider';
import { MarkdownViewer } from '../../MarkdownViewer';
import { Parameter } from './Parameter';
import { SectionTitle } from './SectionTitle';
import { useSelection } from './utils';

type ParameterType = 'query' | 'header' | 'path' | 'cookie';

export interface IParametersProps {
  data?: IQueryParams | IPathParams | ICookieParams | IHeaderParams;
}

const numberValidationNames = [
  'minimum',
  'maximum',
  'minLength',
  'maxLength',
  'minItems',
  'maxItems',
  'exclusiveMinimum',
  'exclusiveMaximum',
] as const;

const readableStyles = {
  [HttpParamStyles.PipeDelimited]: 'Pipe separated values',
  [HttpParamStyles.SpaceDelimited]: 'Space separated values',
  [HttpParamStyles.CommaDelimited]: 'Comma separated values',
  [HttpParamStyles.Simple]: 'Comma separated values',
  [HttpParamStyles.Matrix]: 'Path style values',
  [HttpParamStyles.Label]: 'Label style values',
  [HttpParamStyles.Form]: 'Form style values',
} as const;

const defaultStyle = {
  query: HttpParamStyles.Form,
  header: HttpParamStyles.Simple,
  path: HttpParamStyles.Simple,
  cookie: HttpParamStyles.Form,
} as const;

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
