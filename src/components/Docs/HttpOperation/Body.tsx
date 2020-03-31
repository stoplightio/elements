import { IHttpOperationRequestBody } from '@stoplight/types';
import cn from 'classnames';
import * as React from 'react';

import { isJSONSchema } from '../../../utils/guards';
import { MarkdownViewer } from '../../MarkdownViewer';
import { SchemaViewer } from '../../SchemaViewer';
import { getExamplesObject } from './utils';

export interface IBodyProps {
  body: IHttpOperationRequestBody;
  className?: string;
}

export const Body = ({ body, className }: IBodyProps) => {
  if (typeof body !== 'object' || !body.contents) return null;

  // TODO (CL): Support multiple bodies?
  const requestBody = body.contents[0];
  const schema = requestBody.schema;

  const examples = getExamplesObject(requestBody.examples || []);

  // If we have nothing to show then don't render this section
  if (!requestBody || (!body.description && !schema && !examples)) return null;

  return (
    <div className={cn('HttpOperation__Body', className)}>
      <div className="text-lg font-semibold">Body</div>

      {body.description && <MarkdownViewer className="mt-6" markdown={body.description} />}

      {isJSONSchema(schema) && <SchemaViewer className="mt-6" schema={schema} examples={examples} />}
    </div>
  );
};
Body.displayName = 'HttpOperation.Body';
