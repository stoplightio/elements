import cn from 'classnames';
import * as React from 'react';

import { IResponse } from '../../../AST/Response';
import { groupNodes } from '../../../AST/utils';
import { SchemaViewer } from '../../SchemaViewer';
import { Parameters } from './Parameters';
import { ResponseDescription } from './ResponseDescription';
import { getExamplesObjectFromAST } from './utils';

export const HttpCodeColor = {
  1: 'gray',
  2: 'green',
  3: 'yellow',
  4: 'orange',
  5: 'red',
};

export interface IResponseProps {
  className?: string;
  data: IResponse;
}

export const Response = ({ className, data }: IResponseProps) => {
  if (!data || typeof data !== 'object') return null;

  const groupedNodes = groupNodes(data.children);
  const bodyNodes = groupNodes(groupedNodes.responseBody?.[0].children || []);
  const schema = bodyNodes.schema?.[0];

  const examples = getExamplesObjectFromAST(bodyNodes.responseExample || []);

  return (
    <div className={cn('HttpOperation__Response pt-6 pl-8', className)}>
      <ResponseDescription data={groupedNodes.description?.[0]} />

      <Parameters data={groupedNodes.headerParams?.[0]} />

      {schema && <SchemaViewer schema={schema.value} examples={examples} forceShowTabs />}
    </div>
  );
};
Response.displayName = 'HttpOperation.Response';
