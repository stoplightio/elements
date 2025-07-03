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
import { SectionSubtitle, SectionTitle } from '../Sections';
import LazySchemaTreePreviewer from './LazySchemaTreePreviewer';
import { Parameters } from './Parameters';

// interface ResponseProps {
//   response: IHttpOperationResponse;
//   onMediaTypeChange?: (mediaType: string) => void;
//   disableProps?: Array<{
//     location: string;
//     paths: Array<{ path: string }>;
//   }>;
// }

// interface ResponsesProps {
//   responses: IHttpOperationResponse[];
//   onMediaTypeChange?: (mediaType: string) => void;
//   onStatusCodeChange?: (statusCode: string) => void;
//   isCompact?: boolean;
//   disableProps?: Array<{
//     location: string;
//     paths: Array<{ path: string }>;
//   }>;
// }

interface DisablePropEntry {
  location: string;
  paths: Array<{ path: string }>;
}

interface DisablePropsByStatus {
  [statusCode: string]: DisablePropEntry[];
}

interface ResponseProps {
  response: IHttpOperationResponse;
  onMediaTypeChange?: (mediaType: string) => void;
  disableProps?: DisablePropsByStatus;
  statusCode?: string;
}

interface ResponsesProps {
  responses: IHttpOperationResponse[];
  onMediaTypeChange?: (mediaType: string) => void;
  onStatusCodeChange?: (statusCode: string) => void;
  isCompact?: boolean;
  disableProps?: DisablePropsByStatus;
}

export const Responses = ({
  responses: unsortedResponses,
  onStatusCodeChange,
  onMediaTypeChange,
  isCompact,
  disableProps,
}: ResponsesProps) => {
  console.log('disableProps received in Responses  :', disableProps);

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
      console.log('selectedResponse.code', selectedResponse?.code);
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
  // console.log('response line 106 response', JSON.stringify(response));

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
                  {console.log('response.code line no 158')}

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
        <Response
          response={response}
          onMediaTypeChange={onMediaTypeChange}
          disableProps={disableProps}
          statusCode={activeResponseId}
        />
      ) : (
        <TabPanels p={0}>
          {responses.map(response => (
            <TabPanel key={response.code} id={response.code}>
              <Response
                response={response}
                onMediaTypeChange={onMediaTypeChange}
                disableProps={disableProps}
                statusCode={response.code}
              />
            </TabPanel>
          ))}
        </TabPanels>
      )}
    </VStack>
  );
};
Responses.displayName = 'HttpOperation.Responses';

const Response = ({ response, onMediaTypeChange, disableProps, statusCode }: ResponseProps) => {
  const { contents = [], headers = [], description } = response;
  const [chosenContent, setChosenContent] = React.useState(0);
  const [refResolver, maxRefDepth] = useSchemaInlineRefResolver();
  const { nodeHasChanged, renderExtensionAddon } = useOptionsCtx();

  const responseContent = contents[chosenContent];
  const schema: any = responseContent?.schema;

  React.useEffect(() => {
    responseContent && onMediaTypeChange?.(responseContent.mediaType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseContent]);

  const descriptionChanged = nodeHasChanged?.({ nodeId: response.id, attr: 'description' });

  // const getMaskProperties = (): Array<{ path: string }> => {
  //   const data = localStorage.getItem('responseBodyDisabledProps') || '[]'; // Default to an empty array string
  //   try {
  //     const parsedData = JSON.parse(data);
  //     // Ensure parsed data is actually an array and contains objects with 'path' property
  //     if (Array.isArray(parsedData) && parsedData.every(item => typeof item.path === 'string')) {
  //       return parsedData;
  //     } else {
  //       console.error('Invalid data format in localStorage:', parsedData);
  //       return []; // Fallback to empty array
  //     }
  //   } catch (err) {
  //     console.error('Error parsing localStorage data:', err);
  //     return []; // Fallback to empty array on error
  //   }
  // };

  // Responses.tsx - inside the Response component

  const getMaskProperties = (): Array<{ path: string; required?: boolean }> => {
    if (!disableProps || !statusCode) return [];

    // const disablePropsConfig = MOCK_DISABLE_PROPS.disableProps.response;
    console.log('disableProps received in getMaskProperties from data with status code:', disableProps);
    // console.log('disableProps MOCK_DISABLE_PROPS:', MOCK_DISABLE_PROPS.disableProps.response);

    // const disablePropsConfig = disableProps || [];

    // const absolutePathsToHide: Array<{ path: string; required?: boolean }> = [];

    // disablePropsConfig.forEach(configEntry => {
    //   const { location, paths } = configEntry;
    //   paths.forEach(item => {
    //     // Construct the full absolute path
    //     const fullPath = `${location}/${item.path}`;
    //     absolutePathsToHide.push({ path: fullPath });
    //   });
    // });
    console.log('disableProps received in getMaskProperties statusCode:', statusCode);

    const configEntries = disableProps[statusCode] || [];
    console.log('disableProps received in getMaskProperties configEntries:', configEntries);

    const absolutePathsToHide: Array<{ path: string; required?: boolean }> = [];

    configEntries.forEach(({ location, paths }) => {
      paths.forEach(item => {
        absolutePathsToHide.push({ path: `${location}/${item.path}` });
      });
    });
    console.log('getMaskProperties absolutePathsToHide==>', absolutePathsToHide);
    return absolutePathsToHide;
  };

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
          {/* {schema && <LazySchemaTreePreviewer schema={schema} hideData={[]} />} */}
          {/* {console.log('we are in LazySchemaTreePreviewer schema Line no 266', JSON.stringify(schema))} */}
          {schema && localStorage.getItem('use_new_mask_workflow') === 'true' ? (
            <>
              {/* THIS IS THE EXACT LINE THAT WAS ADDED: */}
              {console.log('Schema passed to LazySchemaTreePreviewer:', schema)}

              <LazySchemaTreePreviewer schema={schema} path="" hideData={getMaskProperties()} />
            </>
          ) : (
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
