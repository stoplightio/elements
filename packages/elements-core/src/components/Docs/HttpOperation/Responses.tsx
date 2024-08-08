import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IntentVals,
  ListBox,
  ListBoxItem,
  Modal,
  NodeAnnotation,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useModalState,
  VStack,
} from '@stoplight/mosaic';
import { IHttpOperationResponse } from '@stoplight/types';
import { sortBy, uniqBy } from 'lodash';
import * as React from 'react';

import { useSchemaInlineRefResolver } from '../../../context/InlineRefResolver';
import { useOptionsCtx } from '../../../context/Options';
import { getOriginalObject } from '../../../utils/ref-resolving/resolvedObject';
import { MarkdownViewer } from '../../MarkdownViewer';
import { SectionSubtitle, SectionTitle, SubSectionPanel } from '../Sections';
import { Parameters } from './Parameters';

interface ResponseProps {
  response: IHttpOperationResponse;
  onMediaTypeChange?: (mediaType: string) => void;
}

interface ResponsesProps {
  responses: IHttpOperationResponse[];
  onMediaTypeChange?: (mediaType: string) => void;
  onStatusCodeChange?: (statusCode: string) => void;
  isCompact?: boolean;
}

export const Responses = ({
  responses: unsortedResponses,
  onStatusCodeChange,
  onMediaTypeChange,
  isCompact,
}: ResponsesProps) => {
  const responses = sortBy(
    uniqBy(unsortedResponses, r => r.code),
    r => r.code,
  );

  const [activeResponseId, setActiveResponseId] = React.useState(responses[0]?.code ?? '');
  const { isOpen, open, close } = useModalState();

  const onSelectionChange = React.useCallback(
    keys => {
      const selectedId = keys.values().next().value;
      const selectedResponse = responses?.find(response => response.id === selectedId);
      if (selectedResponse) {
        setActiveResponseId(selectedResponse.code);
        close();
      }
    },
    [responses, setActiveResponseId, close],
  );

  React.useEffect(() => {
    onStatusCodeChange?.(activeResponseId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeResponseId]);

  if (!responses.length) return null;

  const response = responses.find(r => r.code === activeResponseId) || responses[0];

  const compactResponses = (
    <>
      <Button
        aria-label="response-codes"
        onPress={open}
        iconRight={<Icon icon="chevron-down" color="var(--color-border-button)" />}
        style={{
          color: `var(--color-${codeToIntentVal(activeResponseId)})`,
        }}
        appearance="minimal"
      >
        {activeResponseId}
      </Button>

      <Modal
        title="Response Code"
        isOpen={isOpen}
        onClose={close}
        size="sm"
        footer={
          <HStack justifyContent="end">
            <Button onPress={close} intent="default" appearance="primary">
              Close
            </Button>
          </HStack>
        }
      >
        <ListBox
          aria-label="Response Code"
          overflowY="auto"
          m={-5}
          items={responses}
          selectionMode="single"
          onSelectionChange={onSelectionChange}
        >
          {(response: IHttpOperationResponse) => (
            <ListBoxItem key={response.id}>
              <Box data-test={response.code} p={3} bg={{ hover: 'primary-tint' }}>
                <Flex w="2xl" align="center" justify="end">
                  {response.code === activeResponseId && <Box as={Icon} icon="check" />}
                  <Text ml={3} fontWeight="medium">
                    {response.code}
                  </Text>
                </Flex>
              </Box>
            </ListBoxItem>
          )}
        </ListBox>
      </Modal>
    </>
  );

  const tabResponses = (
    <TabList density="compact">
      {responses.map(({ code }) => (
        <Tab key={code} id={code} intent={codeToIntentVal(code)}>
          {code}
        </Tab>
      ))}
    </TabList>
  );

  return (
    <VStack spacing={8} as={Tabs} selectedId={activeResponseId} onChange={setActiveResponseId} appearance="pill">
      <SectionTitle title="Responses" isCompact={isCompact}>
        {isCompact ? compactResponses : tabResponses}
      </SectionTitle>

      {isCompact ? (
        <Response response={response} onMediaTypeChange={onMediaTypeChange} />
      ) : (
        <TabPanels p={0}>
          {responses.map(response => (
            <TabPanel key={response.code} id={response.code}>
              <Response response={response} onMediaTypeChange={onMediaTypeChange} />
            </TabPanel>
          ))}
        </TabPanels>
      )}
    </VStack>
  );
};
Responses.displayName = 'HttpOperation.Responses';

const Response = ({ response, onMediaTypeChange }: ResponseProps) => {
  const { contents = [], headers = [], description } = response;
  const [chosenContent, setChosenContent] = React.useState(0);
  const [refResolver, maxRefDepth] = useSchemaInlineRefResolver();
  const { nodeHasChanged, renderExtensionAddon } = useOptionsCtx();

  const responseContent = contents[chosenContent];
  const schema = responseContent?.schema;

  React.useEffect(() => {
    responseContent && onMediaTypeChange?.(responseContent.mediaType);
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
                onChange={value => setChosenContent(parseInt(String(value), 10))}
                options={contents.map((content, index) => ({ label: content.mediaType, value: index }))}
                size="sm"
              />
            </Flex>
          </SectionSubtitle>

          {schema && (
            <SubSectionPanel title={(schema.title ?? '') + ' Schema'} defaultIsOpen={false} hasContent>
              <Box pl={3} pr={3} pt={5}>
                <JsonSchemaViewer
                  schema={getOriginalObject(schema)}
                  resolveRef={refResolver}
                  maxRefDepth={maxRefDepth}
                  viewMode="read"
                  parentCrumbs={['responses', response.code]}
                  renderRootTreeLines
                  nodeHasChanged={nodeHasChanged}
                  renderExtensionAddon={renderExtensionAddon}
                />
              </Box>
            </SubSectionPanel>
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
