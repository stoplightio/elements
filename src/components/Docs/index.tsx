import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';
import { CLASSNAMES, MarkdownViewer } from '@stoplight/markdown-viewer';
import { NodeType } from '@stoplight/types';
import { ScrollContainer } from '@stoplight/ui-kit/ScrollContainer';
import cn from 'classnames';
import * as React from 'react';
import { HttpOperation } from '../HttpOperation';
import { HttpService } from '../HttpService';

export interface IDocs {
  type: NodeType;
  data: any;

  className?: string;
}

const JSV_MAX_ROWS = 20;

export const Docs: React.FunctionComponent<IDocs> = ({ type, data, className }) => {
  let component;

  if (type === 'http_operation') {
    component = <HttpOperation value={data} />;
  }

  if (type === 'http_service') {
    component = <HttpService value={data} />;
  }

  if (type === 'article') {
    component = <MarkdownViewer markdown={data} />;
  }

  if (type === 'model') {
    component = (
      <div className={cn(CLASSNAMES.bordered)}>
        <JsonSchemaViewer schema={data} maxRows={JSV_MAX_ROWS} />
      </div>
    );
  }

  return (
    <ScrollContainer>
      <div className={cn('Docs', className)}>{component ? component : `Node type "{type}" is not supported.`}</div>
    </ScrollContainer>
  );
};
