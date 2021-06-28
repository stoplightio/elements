import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';
import { Box, Select, Tab, TabList, TabPanel, TabPanels, Tabs } from '@stoplight/mosaic';
import { IHttpOperationResponse } from '@stoplight/types';
import { sortBy, uniqBy } from 'lodash';
import * as React from 'react';

import { useInlineRefResolver } from '../../../context/InlineRefResolver';
import { getOriginalObject } from '../../../utils/ref-resolving/resolvedObject';
import { MarkdownViewer } from '../../MarkdownViewer';
import { SectionTitle, SubSectionPanel } from '../Sections';
import { Parameters } from './Parameters';

interface ResponseProps {
  response: IHttpOperationResponse;
  onMediaTypeChange(mediaType: string): void;
}

interface ResponsesProps {
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
                {code}
              </Tab>
            ))}
          </TabList>
        </SectionTitle>
        <Box as={TabPanels} mt={4}>
          {responses.map(response => (
            <TabPanel key={response.code} id={response.code}>
              <Response response={response} onMediaTypeChange={onMediaTypeChange} />
            </TabPanel>
          ))}
        </Box>
      </Box>
    </Tabs>
  );
};
Responses.displayName = 'HttpOperation.Responses';

const Response = ({ response: { contents = [], headers = [], description }, onMediaTypeChange }: ResponseProps) => {
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
      {description && <MarkdownViewer className="sl-ml-1 sl-mb-6" markdown={description} />}

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
              aria-label="Response Body Content Type"
              value={String(chosenContent)}
              onChange={(value: string | number) => setChosenContent(parseInt(String(value), 10))}
              options={contents.map((content, index) => ({ label: content.mediaType, value: index }))}
              size="sm"
            />
          }
        >
          {schema && (
            <Box>
              <JsonSchemaViewer
                schema={getOriginalObject(schema)}
                resolveRef={refResolver}
                viewMode="read"
                hideExamples
              />
            </Box>
          )}
        </SubSectionPanel>
      )}
    </Box>
  );
};
Response.displayName = 'HttpOperation.Response';
