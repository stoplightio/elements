import { IHttpOperationRequestBody } from '@stoplight/types';
import { isEmpty } from 'lodash';
import * as React from 'react';

import { isJSONSchema } from '../../../utils/guards';
import { MarkdownViewer } from '../../MarkdownViewer';
import { SchemaViewer } from '../../SchemaViewer';
import { SubSectionPanel } from '../Sections';
import { getExamplesObject } from './utils';

export interface BodyProps {
  body: IHttpOperationRequestBody;
}

export const Body = ({ body: { contents: [content] = [], description } }: BodyProps) => {
  const schema = content?.schema;
  const examples = getExamplesObject(content?.examples || []);

  // If we have nothing to show then don't render this section
  if (!description && !schema && isEmpty(examples)) return null;

  return (
    <SubSectionPanel title="Body">
      {description && <MarkdownViewer className="mt-6" markdown={description} />}

      {isJSONSchema(schema) && <SchemaViewer className="mt-6" schema={schema} examples={examples} viewMode="write" />}
    </SubSectionPanel>
  );
};
Body.displayName = 'HttpOperation.Body';
