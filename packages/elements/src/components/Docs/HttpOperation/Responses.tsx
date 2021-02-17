import { Box, Tab, TabList, TabPanel, Tabs, Text } from '@stoplight/mosaic';
import { IHttpOperationResponse } from '@stoplight/types';
import cn from 'classnames';
import { sortBy, uniqBy } from 'lodash';
import * as React from 'react';

import { MarkdownViewer } from '../../MarkdownViewer';
import { SchemaViewer } from '../../SchemaViewer';
import { Parameters } from './Parameters';
import { SectionTitle } from './SectionTitle';
import { getExamplesObject } from './utils';

export const HttpCodeColor = {
  1: 'gray',
  2: 'green',
  3: 'yellow',
  4: 'orange',
  5: 'red',
};

export interface IResponseProps {
  className?: string;
  response: IHttpOperationResponse;
}

export interface IResponsesProps {
  responses: IHttpOperationResponse[];
}

export const Responses = ({ responses: unsortedResponses }: IResponsesProps) => {
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

export const Response = ({ className, response }: IResponseProps) => {
  if (!response || typeof response !== 'object') return null;

  const content = response.contents && response.contents[0];

  const examples = getExamplesObject(content?.examples || []);

  return (
    <div className={cn('HttpOperation__Response pt-6 pl-8', className)}>
      <MarkdownViewer className="ml-1 mb-6" markdown={response.description || '*No description.*'} />

      <Parameters className="mb-6" title="Headers" parameterType="header" parameters={response.headers} />

      {content?.schema && <SchemaViewer schema={content.schema} examples={examples} viewMode="read" forceShowTabs />}
    </div>
  );
};
Response.displayName = 'HttpOperation.Response';
