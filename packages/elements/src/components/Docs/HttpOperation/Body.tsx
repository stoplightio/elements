import { Select } from '@stoplight/mosaic';
import { IHttpOperationRequestBody } from '@stoplight/types';
import * as React from 'react';

import { isJSONSchema } from '../../../utils/guards';
import { MarkdownViewer } from '../../MarkdownViewer';
import { SchemaViewer } from '../../SchemaViewer';
import { SubSectionPanel } from '../Sections';
import { getExamplesObject } from './utils';

export interface BodyProps {
  body: IHttpOperationRequestBody;
}

export const Body = ({ body: { contents = [], description } }: BodyProps) => {
  const [chosenContent, setChosenContent] = React.useState(0);

  if (contents.length === 0 && !description) return null;

  const schema = contents[chosenContent]?.schema;
  const examples = getExamplesObject(contents[chosenContent]?.examples || []);

  return (
    <SubSectionPanel
      title="Body"
      rightComponent={
        contents.length > 0 && (
          <Select
            aria-label="Choose Request Body Content Type"
            onChange={e => setChosenContent(parseInt(e.currentTarget.value, 10))}
            options={contents.map((content, index) => ({ label: content.mediaType, value: index }))}
          />
        )
      }
    >
      {description && <MarkdownViewer className="mb-6" markdown={description} />}

      {isJSONSchema(schema) && <SchemaViewer className="mt-6" schema={schema} examples={examples} viewMode="write" />}
    </SubSectionPanel>
  );
};
Body.displayName = 'HttpOperation.Body';
