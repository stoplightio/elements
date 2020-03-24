import { Dictionary, IHttpOperationRequestBody, INodeExample, INodeExternalExample } from '@stoplight/types';
import cn from 'classnames';
import { get, reduce } from 'lodash';
import * as React from 'react';

import { isJSONSchema } from '../../../utils/json-schema';
import { MarkdownViewer } from '../../MarkdownViewer';
import { SchemaViewer } from '../../SchemaViewer';

export interface IBodyProps {
  body: IHttpOperationRequestBody;
  className?: string;
}

export const Body: React.FunctionComponent<IBodyProps> = ({ body, className }) => {
  if (typeof body !== 'object' || !body.contents) return null;

  // TODO (CL): Support multiple bodies?
  const requestBody = get(body, 'contents[0]');
  const schema = get(requestBody, 'schema');

  const examples = reduce<INodeExample | INodeExternalExample, Dictionary<string>>(
    get(requestBody, 'examples'),
    (collection, item) => {
      const value = 'externalValue' in item ? item.externalValue : item.value;
      if (value) {
        collection[item.key] = value;
      }

      return collection;
    },
    {},
  );

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
