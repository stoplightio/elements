import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';
import { CLASSNAMES, MarkdownViewer } from '@stoplight/markdown-viewer';
import { NodeType } from '@stoplight/types';
import { ScrollContainer } from '@stoplight/ui-kit/ScrollContainer';
import cn from 'classnames';
import * as React from 'react';
import { HttpOperation } from './HttpOperation';
import { HttpService } from './HttpService';

export interface IDocs {
  type: NodeType;
  data: any;

  className?: string;
}

const JSV_MAX_ROWS = 50;
export const Docs: React.FunctionComponent<IDocs> = ({ type, data, className }) => {
  let component;

  if (type === NodeType.HttpOperation) {
    component = <HttpOperation value={data} />;
  } else if (type === NodeType.HttpService) {
    component = <HttpService value={data} />;
  } else if (type === NodeType.Article) {
    component = <MarkdownViewer markdown={data} />;
  } else if (type === NodeType.Model) {
    component = (
      <div className={cn(CLASSNAMES.bordered)}>
        <JsonSchemaViewer schema={data} maxRows={JSV_MAX_ROWS} />
      </div>
    );
  } else {
    console.warn(`Node type "${type}" is not supported.`);
    return null;
  }

  return (
    <ScrollContainer>
      <div className={cn('Docs', className)}>{component}</div>
    </ScrollContainer>
  );
};
