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
  if (type === 'http_operation') {
    return (
      <div className={className}>
        <Request request={data.request} />

        <Responses responses={data.responses} />
      </div>
    );
  }

  if (type === 'http_service') {
    return <HttpService className={className} value={data} />;
  }

  if (type === 'article') {
    return <MarkdownViewer className={className} markdown={data} />;
  }

  if (type === 'model') {
    return (
      <div className={className}>
        <div className={cn(CLASSNAMES.block, CLASSNAMES.bordered)}>
          <JsonSchemaViewer schema={data} maxRows={JSV_MAX_ROWS} />
        </div>
      </div>
    );
  }

  return <div className={className}>Node type "{type}" is not supported.</div>;
};
