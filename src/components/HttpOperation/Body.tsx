import { IHttpOperationRequestBody } from '@stoplight/types';
import cn from 'classnames';
import { get } from 'lodash';
import * as React from 'react';

import { MarkdownViewer } from '../MarkdownViewer';
import { Schema } from './Schema';

export interface IBodyProps {
  body: IHttpOperationRequestBody;
  className?: string;
}

export const Body: React.FunctionComponent<IBodyProps> = ({ body, className }) => {
  if (typeof body !== 'object' || !body.contents) return null;

  // TODO (CL): Support multiple bodies?
  const requestBody = get(body, 'contents[0]');
  const schema = get(requestBody, 'schema');
  const examples = get(requestBody, 'examples');

  // If we have nothing to show then don't render this section
  if (!requestBody || (!body.description && !schema && !examples)) return null;

  return (
    <div className={cn('HttpOperation__Body', className)}>
      <div className="text-lg font-semibold">Body</div>

      {body.description && <MarkdownViewer className="mt-6" markdown={body.description} />}

      <Schema className="mt-6" value={schema} examples={examples} />
    </div>
  );
};
Body.displayName = 'HttpOperation.Body';
