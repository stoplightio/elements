import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';
import { Box, Select } from '@stoplight/mosaic';
import { IHttpOperationRequestBody } from '@stoplight/types';
import { JSONSchema4 } from 'json-schema';
import * as React from 'react';

import { useInlineRefResolver } from '../../../context/InlineRefResolver';
import { isJSONSchema } from '../../../utils/guards';
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
            aria-label="Choose Request Body Content Type"
            onChange={e => setChosenContent(parseInt(e.currentTarget.value, 10))}
            options={contents.map((content, index) => ({ label: content.mediaType, value: index }))}
          />
        )
      }
    >
      {description && <MarkdownViewer className="mb-6" markdown={description} />}

      {isJSONSchema(schema) && (
        <Box ml={-9}>
          <JsonSchemaViewer resolveRef={refResolver} schema={schema as JSONSchema4} viewMode="write" />
        </Box>
      )}
    </SubSectionPanel>
  );
};
Body.displayName = 'HttpOperation.Body';
