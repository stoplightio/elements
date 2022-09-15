import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';
import {
  Box,
  Flex,
  IntentVals,
  NodeAnnotation,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@stoplight/mosaic';
import { IHttpOperationResponse } from '@stoplight/types';
import { sortBy, uniqBy } from 'lodash';
import * as React from 'react';

import { useInlineRefResolver } from '../../../context/InlineRefResolver';
import { useOptionsCtx } from '../../../context/Options';
import { getOriginalObject } from '../../../utils/ref-resolving/resolvedObject';
import { MarkdownViewer } from '../../MarkdownViewer';
import { SectionSubtitle, SectionTitle } from '../Sections';
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
    <VStack spacing={8} as={Tabs} selectedId={activeResponseId} onChange={setActiveResponseId} appearance="pill">
      <SectionTitle title="Responses">
        <TabList density="compact">
          {responses.map(({ code }) => (
            <Tab key={code} id={code} intent={codeToIntentVal(code)}>
              {code}
            </Tab>
          ))}
        </TabList>
      </SectionTitle>

      <TabPanels p={0}>
        {responses.map(response => (
          <TabPanel key={response.code} id={response.code}>
            <Response response={response} onMediaTypeChange={onMediaTypeChange} />
          </TabPanel>
        ))}
      </TabPanels>
    </VStack>
  );
};
Responses.displayName = 'HttpOperation.Responses';

const Response = ({ response, onMediaTypeChange }: ResponseProps) => {
  const { contents = [], headers = [], description } = response;
  const [chosenContent, setChosenContent] = React.useState(0);
  const refResolver = useInlineRefResolver();
  const { nodeHasChanged } = useOptionsCtx();

  const responseContent = contents[chosenContent];
  const schema = responseContent?.schema;

  React.useEffect(() => {
    responseContent && onMediaTypeChange(responseContent.mediaType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseContent]);

  const descriptionChanged = nodeHasChanged?.({ nodeId: response.id, attr: 'description' });

  return (
    <VStack spacing={8} pt={8}>
      {description && (
        <Box pos="relative">
          <MarkdownViewer markdown={description} />
          <NodeAnnotation change={descriptionChanged} />
        </Box>
      )}

      {headers.length > 0 && (
        <VStack spacing={5}>
          <SectionSubtitle title="Headers" id="response-headers" />
          <Parameters parameterType="header" parameters={headers} />
        </VStack>
      )}

      {contents.length > 0 && (
        <>
          <SectionSubtitle title="Body" id="response-body">
            <Flex flex={1} justify="end">
              <Select
                aria-label="Response Body Content Type"
                value={String(chosenContent)}
                onChange={(value: string | number) => setChosenContent(parseInt(String(value), 10))}
                options={contents.map((content, index) => ({ label: content.mediaType, value: index }))}
                size="sm"
              />
            </Flex>
          </SectionSubtitle>

          {schema && (
            <JsonSchemaViewer
              schema={getOriginalObject(schema)}
              resolveRef={refResolver}
              viewMode="read"
              parentCrumbs={['responses', response.code]}
              renderRootTreeLines
              nodeHasChanged={nodeHasChanged}
            />
          )}
        </>
      )}
    </VStack>
  );
};
Response.displayName = 'HttpOperation.Response';

const codeToIntentVal = (code: string): IntentVals => {
  const firstChar = code.charAt(0);

  switch (firstChar) {
    case '2':
      return 'success';
    case '4':
      return 'warning';
    case '5':
      return 'danger';
    default:
      return 'default';
  }
};
