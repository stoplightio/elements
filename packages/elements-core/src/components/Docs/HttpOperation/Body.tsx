import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';
import { Flex, Select, VStack } from '@stoplight/mosaic';
import { IHttpOperationRequestBody } from '@stoplight/types';
import * as React from 'react';

import { useInlineRefResolver } from '../../../context/InlineRefResolver';
import { isJSONSchema } from '../../../utils/guards';
import { getOriginalObject } from '../../../utils/ref-resolving/resolvedObject';
import { MarkdownViewer } from '../../MarkdownViewer';
import { SectionSubtitle } from '../Sections';

export interface BodyProps {
  body: IHttpOperationRequestBody;
  onChange: (requestBodyIndex: number) => void;
}

export const isBodyEmpty = (body?: BodyProps['body']) => {
  if (!body) return true;

  const { contents = [], description } = body;

  return contents.length === 0 && !description?.trim();
};

export const Body = ({ body, onChange }: BodyProps) => {
  const refResolver = useInlineRefResolver();
  const [chosenContent, setChosenContent] = React.useState(0);

  React.useEffect(() => {
    onChange(chosenContent);
    // disabling because we don't want to react on `onChange` change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenContent]);

  if (isBodyEmpty(body)) return null;

  const { contents = [], description } = body;
  const schema = contents[chosenContent]?.schema;

  return (
    <VStack spacing={6}>
      <SectionSubtitle title="Body" id="request-body">
        {contents.length > 0 && (
          <Flex flex={1} justify="end">
            <Select
              aria-label="Request Body Content Type"
              value={String(chosenContent)}
              onChange={(value: string | number) => setChosenContent(parseInt(String(value), 10))}
              options={contents.map((content, index) => ({ label: content.mediaType, value: index }))}
              size="sm"
            />
          </Flex>
        )}
      </SectionSubtitle>

      {description && <MarkdownViewer markdown={description} />}

      {isJSONSchema(schema) && (
        <JsonSchemaViewer
          resolveRef={refResolver}
          schema={getOriginalObject(schema)}
          viewMode="write"
          hideExamples
          renderRootTreeLines
        />
      )}
    </VStack>
  );
};
Body.displayName = 'HttpOperation.Body';
