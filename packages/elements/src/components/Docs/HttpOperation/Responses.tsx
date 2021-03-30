import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';
import { Box, Select, Tab, TabList, TabPanel, Tabs, Text } from '@stoplight/mosaic';
import { IHttpOperationResponse } from '@stoplight/types';
import { JSONSchema4 } from 'json-schema';
import { sortBy, uniqBy } from 'lodash';
import * as React from 'react';

import { useInlineRefResolver } from '../../../context/InlineRefResolver';
import { MarkdownViewer } from '../../MarkdownViewer';
import { SectionTitle, SubSectionPanel } from '../Sections';
import { Parameters } from './Parameters';

export const HttpCodeColor = {
  1: 'gray',
  2: 'green',
  3: 'yellow',
  4: 'orange',
  5: 'red',
};

export interface ResponseProps {
  response: IHttpOperationResponse;
  onMediaTypeChange(mediaType: string): void;
}

export interface ResponsesProps {
  responses: IHttpOperationResponse[];
  onMediaTypeChange(mediaType: string): void;
  onStatusCodeChange(statusCode: string): void;
}

export const Responses = ({ responses: unsortedResponses, onStatusCodeChange, onMediaTypeChange }: ResponsesProps) => {
  const responses = sortBy(
    uniqBy(unsortedResponses, r => r.code),
    r => r.code,
  );

  const [activeResponseId, setActiveResponseId] = React.useState(responses[0]?.code ?? '');

  React.useEffect(() => {
    onStatusCodeChange(activeResponseId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeResponseId]);

  if (!responses.length) return null;

  return (
    <Tabs selectedId={activeResponseId} onChange={setActiveResponseId}>
      <Box>
        <SectionTitle title="Responses">
          <TabList>
            {responses.map(({ code }) => (
              <Tab key={code} id={code}>
                <Text color={code === activeResponseId ? 'primary' : 'muted'}>{code}</Text>
              </Tab>
            ))}
          </TabList>
        </SectionTitle>
        <Box mt={4}>
          {responses.map(response => (
            <TabPanel key={response.code} tabId={response.code}>
              <Response response={response} onMediaTypeChange={onMediaTypeChange} />
            </TabPanel>
          ))}
        </Box>
      </Box>
    </Tabs>
  );
};
Responses.displayName = 'HttpOperation.Responses';

export const Response = ({
  response: { contents = [], headers = [], description },
  onMediaTypeChange,
}: ResponseProps) => {
  const [chosenContent, setChosenContent] = React.useState(0);
  const refResolver = useInlineRefResolver();

  const responseContent = contents[chosenContent];
  const schema = responseContent?.schema;

  React.useEffect(() => {
    responseContent && onMediaTypeChange(responseContent.mediaType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseContent]);

  return (
    <Box>
      {description && <MarkdownViewer className="ml-1 mb-6" markdown={description} />}

      {headers.length > 0 && (
        <SubSectionPanel title="Headers">
          <Parameters parameterType="header" parameters={headers} />
        </SubSectionPanel>
      )}

      {contents.length > 0 && (
        <SubSectionPanel
          title="Body"
          rightComponent={
            <Select
              aria-label="Choose Response Body Content Type"
              onChange={e => setChosenContent(parseInt(e.currentTarget.value, 10))}
              options={contents.map((content, index) => ({ label: content.mediaType, value: index }))}
            />
          }
        >
          {schema && (
            <Box ml={-9}>
              <JsonSchemaViewer schema={schema as JSONSchema4} resolveRef={refResolver} viewMode="read" />
            </Box>
          )}
        </SubSectionPanel>
      )}
    </Box>
  );
};
Response.displayName = 'HttpOperation.Response';
