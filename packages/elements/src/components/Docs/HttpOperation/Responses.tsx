import { Box, Select, Tab, TabList, TabPanel, Tabs, Text } from '@stoplight/mosaic';
import { IHttpOperationResponse } from '@stoplight/types';
import { sortBy, uniqBy } from 'lodash';
import * as React from 'react';

import { MarkdownViewer } from '../../MarkdownViewer';
import { SchemaViewer } from '../../SchemaViewer';
import { SectionTitle, SubSectionPanel } from '../Sections';
import { Parameters } from './Parameters';
import { getExamplesObject } from './utils';

export const HttpCodeColor = {
  1: 'gray',
  2: 'green',
  3: 'yellow',
  4: 'orange',
  5: 'red',
};

export interface ResponseProps {
  response: IHttpOperationResponse;
}

export interface ResponsesProps {
  responses: IHttpOperationResponse[];
}

export const Responses = ({ responses: unsortedResponses }: ResponsesProps) => {
  const responses = sortBy(
    uniqBy(unsortedResponses, r => r.code),
    r => r.code,
  );

  const [activeResponseId, setActiveResponseId] = React.useState(responses[0]?.code ?? '');

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
              <Response response={response} />
            </TabPanel>
          ))}
        </Box>
      </Box>
    </Tabs>
  );
};
Responses.displayName = 'HttpOperation.Responses';

export const Response = ({ response: { contents = [], headers = [], description } }: ResponseProps) => {
  const [chosenContent, setChosenContent] = React.useState(0);

  const schema = contents[chosenContent]?.schema;
  const examples = getExamplesObject(contents[chosenContent]?.examples || []);

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
          {schema && <SchemaViewer schema={schema} examples={examples} viewMode="read" forceShowTabs />}
        </SubSectionPanel>
      )}
    </Box>
  );
};
Response.displayName = 'HttpOperation.Response';
