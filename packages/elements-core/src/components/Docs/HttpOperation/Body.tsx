import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';
import { Box, Flex, NodeAnnotation, Select, VStack } from '@stoplight/mosaic';
import { IHttpOperationRequestBody } from '@stoplight/types';
import * as React from 'react';

import { useSchemaInlineRefResolver } from '../../../context/InlineRefResolver';
import { useOptionsCtx } from '../../../context/Options';
import { isJSONSchema } from '../../../utils/guards';
import { getOriginalObject } from '../../../utils/ref-resolving/resolvedObject';
import { MarkdownViewer } from '../../MarkdownViewer';
import { SectionSubtitle } from '../Sections';
import LazySchemaTreePreviewer from './LazySchemaTreePreviewer';

export interface BodyProps {
  body: IHttpOperationRequestBody;
  onChange?: (requestBodyIndex: number) => void;
  isHttpWebhookOperation?: boolean;
  disableProps?: Array<{
    location: string;
    paths: Array<{ path: string }>;
  }>;
}

export const isBodyEmpty = (body?: BodyProps['body']) => {
  if (!body) return true;

  const { contents = [], description } = body;

  return contents.length === 0 && !description?.trim();
};

export const Body = ({ body, onChange, isHttpWebhookOperation = false, disableProps }: BodyProps) => {
  const [refResolver, maxRefDepth] = useSchemaInlineRefResolver();
  const [chosenContent, setChosenContent] = React.useState(0);
  const { nodeHasChanged, renderExtensionAddon } = useOptionsCtx();
  React.useEffect(() => {
    onChange?.(chosenContent);
    // disabling because we don't want to react on `onChange` change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenContent]);

  if (isBodyEmpty(body)) return null;

  const { contents = [], description } = body;
  const schema = contents[chosenContent]?.schema;
  const descriptionChanged = nodeHasChanged?.({ nodeId: body.id, attr: 'description' });

  /* Get Masked Properties And Pass to LazySchemaTreePreviewer */
  const getMaskProperties = (): Array<{ path: string; required?: boolean }> => {
    const disablePropsConfig = disableProps || [];
    const absolutePathsToHide: Array<{ path: string; required?: boolean }> = [];
    disablePropsConfig.forEach(configEntry => {
      const { location, paths } = configEntry;
      paths.forEach((item: any) => {
        const fullPath = location === '#' ? item?.path : `${location}/${item.path}`;
        let object: any = { path: fullPath };
        if (item.hasOwnProperty('required')) {
          object = { ...object, required: item?.required };
        }
        absolutePathsToHide.push(object);
      });
    });
    return absolutePathsToHide;
  };

  return (
    <VStack spacing={6}>
      <SectionSubtitle title="Body" id="request-body">
        {contents.length > 0 && (
          <Flex flex={1} justify="end">
            <Select
              aria-label="Request Body Content Type"
              value={String(chosenContent)}
              onChange={value => setChosenContent(parseInt(String(value), 10))}
              options={contents.map((content, index) => ({ label: content.mediaType, value: index }))}
              size="sm"
            />
          </Flex>
        )}
      </SectionSubtitle>
      {description && (
        <Box pos="relative">
          <MarkdownViewer markdown={description} />
          <NodeAnnotation change={descriptionChanged} />
        </Box>
      )}
      {schema && localStorage.getItem('use_new_mask_workflow') === 'true' ? (
        <LazySchemaTreePreviewer schema={schema} hideData={getMaskProperties()} />
      ) : (
        isJSONSchema(schema) && (
          <JsonSchemaViewer
            resolveRef={refResolver}
            maxRefDepth={maxRefDepth}
            schema={getOriginalObject(schema)}
            viewMode={isHttpWebhookOperation ? 'standalone' : 'write'}
            renderRootTreeLines
            nodeHasChanged={nodeHasChanged}
            renderExtensionAddon={renderExtensionAddon}
          />
        )
      )}
    </VStack>
  );
};
Body.displayName = 'HttpOperation.Body';
