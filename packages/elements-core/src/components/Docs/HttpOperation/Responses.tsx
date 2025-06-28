// import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';
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

// import { useSchemaInlineRefResolver } from '../../../context/InlineRefResolver';
import { useOptionsCtx } from '../../../context/Options';
// import { getOriginalObject } from '../../../utils/ref-resolving/resolvedObject';
import { MarkdownViewer } from '../../MarkdownViewer';
import { SectionSubtitle, SectionTitle } from '../Sections';
import LazySchemaTreePreviewer from './LazySchemaTreePreviewer';
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
  // const [refResolver, maxRefDepth] = useSchemaInlineRefResolver();
  // const { nodeHasChanged, renderExtensionAddon } = useOptionsCtx();
  const { nodeHasChanged } = useOptionsCtx();

  const responseContent = contents[chosenContent];
  const schema: any = responseContent?.schema;

  React.useEffect(() => {
    responseContent && onMediaTypeChange?.(responseContent.mediaType);
  }, [onMediaTypeChange, responseContent]);

  const descriptionChanged = nodeHasChanged?.({ nodeId: response.id, attr: 'description' });

  // NEW: Function to get hide data in new format

  // NEW: Helper function to convert old format to new format (if needed for migration)
  // const convertOldToNewFormat = (oldFormatData: Array<{ path: string }>) => {
  //   return {
  //     data: {},
  //     disableProps: {
  //       response: [
  //         {
  //           paths: oldFormatData.map(item => item.path),
  //           location: 'properties',
  //         },
  //       ],
  //       request: [],
  //     },
  //   };
  // };

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

          {console.log('we are in LazySchemaTreePreviewer schema Line no 266', JSON.stringify(schema))}

          {/* NEW: Always use the new LazySchemaTreePreviewer with new format */}
          {schema && (
            <LazySchemaTreePreviewer
              schema={schema}
              hideData={getNewFormatHideData()}
              currentLocation="properties" // Set the initial location
            />
          )}

          {/* OLD: Keeping the old logic commented for reference
          {schema && localStorage.getItem('use_new_mask_workflow') === 'true' ? (
            <LazySchemaTreePreviewer schema={schema} hideData={getMaskProperties()} />
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
          */}
        </>
      )}
    </VStack>
  );
};

// const Response = ({ response, onMediaTypeChange }: ResponseProps) => {
//   const { contents = [], headers = [], description } = response;
//   const [chosenContent, setChosenContent] = React.useState(0);
//   const [refResolver, maxRefDepth] = useSchemaInlineRefResolver();
//   const { nodeHasChanged, renderExtensionAddon } = useOptionsCtx();

//   const responseContent = contents[chosenContent];
//   const schema: any = responseContent?.schema;

//   React.useEffect(() => {
//     responseContent && onMediaTypeChange?.(responseContent.mediaType);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [responseContent]);

//   const descriptionChanged = nodeHasChanged?.({ nodeId: response.id, attr: 'description' });

//   // old code
//   const getMaskProperties = (): Array<{ path: string }> => {
//     const data = localStorage.getItem('responseBodyDisabledProps') || '[]'; // Default to an empty array string
//     console.log('-----> we are in response responseBodyDisabledProps getMaskProperties data', data);
//     try {
//       const parsedData = JSON.parse(data);
//       // Ensure parsed data is actually an array and contains objects with 'path' property
//       if (Array.isArray(parsedData) && parsedData.every(item => typeof item.path === 'string')) {
//         console.log('-----> we are in response responseBodyDisabledProps getMaskProperties parsedData', parsedData); // [{"path":"properties/heightMeasure"},{"path":"properties/heightMeasure/properties/unitCode"},{"path":"properties/heightMeasure/properties/value"},{"path":"properties/hold"},{"path":"properties/positionCode"}]

//         return parsedData;
//       } else {
//         console.error('Invalid data format in localStorage:', parsedData);
//         return []; // Fallback to empty array
//       }
//     } catch (err) {
//       console.error('Error parsing localStorage data:', err);
//       return []; // Fallback to empty array on error
//     }
//   };

//   // const getMaskProperties = (): Array<{ path: string }> => {
//   //   const data = localStorage.getItem('disabledPropsPathsByModelName') || '[]'; // Default to an empty array string
//   //   try {
//   //     return JSON.parse(data);
//   //     // Ensure parsed data is actually an array and contains objects with 'path' property
//   //     // if (Array.isArray(parsedData) && parsedData.every(item => typeof item.path === 'string')) {
//   //     //   return parsedData;
//   //     // } else {
//   //     //   console.error('Invalid data format in localStorage:', parsedData);
//   //     //   return []; // Fallback to empty array
//   //     // }
//   //   } catch (err) {
//   //     console.error('Error parsing localStorage data:', err);
//   //     return []; // Fallback to empty array on error
//   //   }
//   // };

//   return (
//     <VStack spacing={8} pt={8}>
//       {description && (
//         <Box pos="relative">
//           <MarkdownViewer markdown={description} />
//           <NodeAnnotation change={descriptionChanged} />
//         </Box>
//       )}

//       {headers.length > 0 && (
//         <VStack spacing={5}>
//           <SectionSubtitle title="Headers" id="response-headers" />
//           <Parameters parameterType="header" parameters={headers} />
//         </VStack>
//       )}

//       {contents.length > 0 && (
//         <>
//           <SectionSubtitle title="Body" id="response-body">
//             <Flex flex={1} justify="end">
//               <Select
//                 aria-label="Response Body Content Type"
//                 value={String(chosenContent)}
//                 onChange={value => setChosenContent(parseInt(String(value), 10))}
//                 options={contents.map((content, index) => ({ label: content.mediaType, value: index }))}
//                 size="sm"
//               />
//             </Flex>
//           </SectionSubtitle>
//           {console.log('-----> we are in LazySchemaTreePreviewer schema updated', JSON.stringify(schema))}
//           {/* {schema && <LazySchemaTreePreviewer schema={schema} hideData={[]} />} */}
//           {schema && localStorage.getItem('use_new_mask_workflow') === 'true' ? (
//             <LazySchemaTreePreviewer schema={schema} hideData={getMaskProperties()} />
//           ) : (
//             <JsonSchemaViewer
//               schema={getOriginalObject(schema)}
//               resolveRef={refResolver}
//               maxRefDepth={maxRefDepth}
//               viewMode="read"
//               parentCrumbs={['responses', response.code]}
//               renderRootTreeLines
//               nodeHasChanged={nodeHasChanged}
//               renderExtensionAddon={renderExtensionAddon}
//             />
//           )}
//         </>
//       )}
//     </VStack>
//   );
// };
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

// 27 june 2025

// working code path /location at level 1
// const renderChildren = () => {
//   console.log('path - ', path);

//   if (!expanded && !isRoot) return null;

//   const children: JSX.Element[] = [];

//   if (schema?.type === 'object' && schema?.properties) {
//     for (const [key, child] of Object.entries(schema?.properties)) {
//       const childPath = `${path}/${key}`;
//       const childLocation = currentLocation; // Keep same location for properties

//       children.push(
//         <li key={key}>
//           <LazySchemaTreePreviewer
//             schema={dereference(child, root)}
//             root={root}
//             title={key}
//             level={level + 2}
//             path={childPath}
//             hideData={hideData}
//             parentRequired={schema?.required}
//             propertyKey={key}
//             currentLocation={childLocation}
//           />
//         </li>,
//       );
//     }
//   } else if (
//     schema?.type === 'array' &&
//     schema?.items &&
//     Object.keys(schema?.items).length > 0 &&
//     !schema?.items?.circular
//   ) {
//     const resolvedItems = dereference(schema?.items, root);
//     if (resolvedItems && resolvedItems.type === 'object' && resolvedItems.properties) {
//       for (const [key, child] of Object.entries(resolvedItems.properties)) {
//         const childPath = `${path}/items/${key}`;
//         const childLocation = currentLocation;

//         children.push(
//           <li key={key}>
//             <LazySchemaTreePreviewer
//               schema={dereference(child, root)}
//               root={root}
//               title={key}
//               level={level + 2}
//               path={childPath}
//               hideData={hideData}
//               parentRequired={resolvedItems.required}
//               propertyKey={key}
//               currentLocation={childLocation}
//             />
//           </li>,
//         );
//       }
//     } else if (resolvedItems && resolvedItems.type === 'array' && resolvedItems.items) {
//       const childPath = `${path}/items`;
//       const childLocation = currentLocation;

//       children.push(
//         <li key="items">
//           <LazySchemaTreePreviewer
//             schema={resolvedItems}
//             root={root}
//             title="items"
//             level={level + 1}
//             path={childPath}
//             hideData={hideData}
//             parentRequired={schema?.required}
//             propertyKey="items"
//             currentLocation={childLocation}
//           />
//         </li>,
//       );
//     } else {
//       const childPath = `${path}/items`;
//       const childLocation = currentLocation;

//       children.push(
//         <li key="items">
//           <LazySchemaTreePreviewer
//             schema={resolvedItems}
//             root={root}
//             title="items"
//             level={level + 1}
//             path={childPath}
//             hideData={hideData}
//             parentRequired={schema?.required}
//             propertyKey="items"
//             currentLocation={childLocation}
//           />
//         </li>,
//       );
//     }
//   }

//   return children.length > 0 ? <ul className="ml-6 border-l border-gray-200 pl-2">{children}</ul> : null;
// };
