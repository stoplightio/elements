import * as React from 'react';

import { MarkdownViewer } from '@stoplight/markdown-viewer';
import { IHttpOperationRequestBody } from '@stoplight/types';
import { Schema } from './Schema';

export interface IBodyProps {
  body: IHttpOperationRequestBody;
  className?: string;
}

export const Body: React.FunctionComponent<IBodyProps> = ({ body, className }) => {
  if (!body || !body.contents) return null;

  // TODO (CL): Support multiple bodies?
  const requestBody = body.contents[0];
  if (!body.description && !requestBody.schema && !requestBody.examples.length) return null;

  return (
    <div className={className}>
      <div className="flex items-center">
        <div className="text-lg font-semibold">Body</div>
      </div>

      {body.description && <MarkdownViewer className="mt-6" markdown={body.description} />}

      <Schema className="mt-6" value={requestBody.schema} examples={requestBody.examples} />
    </div>
  );
};
Body.displayName = 'HttpOperation.Body';
