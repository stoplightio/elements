import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';
import { CLASSNAMES, MarkdownViewer } from '@stoplight/markdown-viewer';
import cn from 'classnames';
import * as React from 'react';

import { NodeType } from '../../utils/node';
import { Request } from '../HttpOperation/Request';
import { Responses } from '../HttpOperation/Responses';
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
    component = (
      <>
        <Request request={data.request} />

        <Responses responses={data.responses} />
      </>
    );
  }

  if (type === 'http_service') {
    component = <HttpService value={data} />;
  }

  if (type === 'article') {
    component = <MarkdownViewer markdown={data} />;
  }

  if (type === 'model') {
    component = (
      <div className={cn(CLASSNAMES.block, CLASSNAMES.bordered)}>
        <JsonSchemaViewer schema={data} maxRows={JSV_MAX_ROWS} />
      </div>
    );
  }

  return (
    <div className={className} style={{ maxWidth: 1000 }}>
      {component ? component : `Node type "{type}" is not supported.`}
    </div>
  );
};
