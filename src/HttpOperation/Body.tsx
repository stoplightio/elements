import { MarkdownViewer } from '@stoplight/markdown-viewer';
import { IHttpOperationRequestBody } from '@stoplight/types';
import * as React from 'react';

import { Schema } from './Schema';

export interface IBodyProps {
  body: IHttpOperationRequestBody;
  className?: string;
}

export const Body: React.FunctionComponent<IBodyProps> = ({ body, className }) => {
  if (typeof body !== 'object' || !body.contents) return null;

  // TODO (CL): Support multiple bodies?
  const requestBody = body.contents[0];

  // If we have nothing to show then don't render this section
  if (
    !body.description &&
    (!requestBody || (!requestBody.schema && (!requestBody.examples || !requestBody.examples.length)))
  )
    return null;

  return (
    <div className={className}>
      <div className="text-lg font-semibold">Body</div>

      {body.description && <MarkdownViewer className="mt-6" markdown={body.description} />}

      <Schema className="mt-6" value={requestBody.schema} examples={requestBody.examples} />
    </div>
  );
};
Body.displayName = 'HttpOperation.Body';
