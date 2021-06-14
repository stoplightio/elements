import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';
import { Box, Select } from '@stoplight/mosaic';
import { IHttpOperationRequestBody } from '@stoplight/types';
import * as React from 'react';

import { useInlineRefResolver } from '../../../context/InlineRefResolver';
import { isJSONSchema } from '../../../utils/guards';
import { getOriginalObject } from '../../../utils/ref-resolving/resolvedObject';
import { MarkdownViewer } from '../../MarkdownViewer';
import { SubSectionPanel } from '../Sections';

export interface BodyProps {
  body: IHttpOperationRequestBody;
  onChange: (requestBodyIndex: number) => void;
}

export const Body = ({ body: { contents = [], description }, onChange }: BodyProps) => {
  const refResolver = useInlineRefResolver();
  const [chosenContent, setChosenContent] = React.useState(0);

  React.useEffect(() => {
    onChange(chosenContent);
    // disabling because we don't want to react on `onChange` change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenContent]);

  if (contents.length === 0 && !description) return null;

  const schema = contents[chosenContent]?.schema;

  return (
    <SubSectionPanel
      title="Body"
      rightComponent={
        contents.length > 0 && (
          <Select
            aria-label="Request Body Content Type"
            value={String(chosenContent)}
            onChange={(value: string | number) => setChosenContent(parseInt(String(value), 10))}
            options={contents.map((content, index) => ({ label: content.mediaType, value: index }))}
            size="sm"
          />
        )
      }
    >
      {description && <MarkdownViewer className="sl-my-2" markdown={description} />}

      {isJSONSchema(schema) && (
        <Box>
          <JsonSchemaViewer resolveRef={refResolver} schema={getOriginalObject(schema)} viewMode="write" hideExamples />
        </Box>
      )}
    </SubSectionPanel>
  );
};
Body.displayName = 'HttpOperation.Body';
