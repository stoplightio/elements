import { Box, Tab, TabList, TabPanel, Tabs, Text } from '@stoplight/mosaic';
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
  const firstResponseCode = responses[0]?.code ?? '';

  const [activeResponseId, setActiveResponseId] = React.useState(firstResponseCode);
  React.useEffect(() => setActiveResponseId(firstResponseCode), [firstResponseCode]);

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

export const Response = ({ response: { contents: [content] = [], headers = [], description } }: ResponseProps) => {
  const examples = getExamplesObject(content?.examples || []);

  return (
    <Box>
      {description && <MarkdownViewer className="ml-1 mb-6" markdown={description} />}

      {headers.length > 0 && (
        <SubSectionPanel title="Headers">
          <Parameters parameterType="header" parameters={headers} />
        </SubSectionPanel>
      )}

      {content?.schema && (
        <SubSectionPanel title="Body">
          <SchemaViewer schema={content.schema} examples={examples} viewMode="read" forceShowTabs />
        </SubSectionPanel>
      )}
    </Box>
  );
};
Response.displayName = 'HttpOperation.Response';
