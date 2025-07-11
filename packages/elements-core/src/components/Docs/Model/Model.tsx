import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';
import { Box, CopyButton, Flex, Heading, HStack, NodeAnnotation, Panel, Select, Text, VStack } from '@stoplight/mosaic';
import { CodeViewer } from '@stoplight/mosaic-code-viewer';
import { withErrorBoundary } from '@stoplight/react-error-boundary';
import cn from 'classnames';
import { JSONSchema7 } from 'json-schema';
import * as React from 'react';

import { useResolvedObject, useSchemaInlineRefResolver } from '../../../context/InlineRefResolver';
import { useOptionsCtx } from '../../../context/Options';
import { useIsCompact } from '../../../hooks/useIsCompact';
import { exceedsSize, generateExamplesFromJsonSchema } from '../../../utils/exampleGeneration/exampleGeneration';
import { getOriginalObject } from '../../../utils/ref-resolving/resolvedObject';
import { LoadMore } from '../../LoadMore';
import { MarkdownViewer } from '../../MarkdownViewer';
import { DocsComponentProps } from '..';
import { DeprecatedBadge, InternalBadge } from '../HttpOperation/Badges';
import LazySchemaTreePreviewer from '../HttpOperation/LazySchemaTreePreviewer';
import { ExportButton } from '../HttpService/ExportButton';
import { NodeVendorExtensions } from '../NodeVendorExtensions';
import { TwoColumnLayout } from '../TwoColumnLayout';

export type ModelProps = DocsComponentProps<JSONSchema7>;

const ModelComponent: React.FC<ModelProps> = ({
  data: unresolvedData,
  className,
  nodeTitle,
  layoutOptions,
  exportProps,
  disableProps,
}) => {
  const [resolveRef, maxRefDepth] = useSchemaInlineRefResolver();
  const data = useResolvedObject(unresolvedData) as JSONSchema7;
  const { nodeHasChanged, renderExtensionAddon } = useOptionsCtx();

  const { ref: layoutRef, isCompact } = useIsCompact(layoutOptions);

  const nodeId = (data?.['x-stoplight' as keyof JSONSchema7] as { [key: string]: any })?.id;
  const title = data.title ?? nodeTitle;
  const isDeprecated = !!data['deprecated' as keyof JSONSchema7];
  const isInternal = !!data['x-internal' as keyof JSONSchema7];

  const shouldDisplayHeader =
    !layoutOptions?.noHeading && (title !== undefined || (exportProps && !layoutOptions?.hideExport));

  const titleChanged = nodeHasChanged?.({ nodeId, attr: ['title', 'internal'] });
  const header = (shouldDisplayHeader || isInternal || isDeprecated) && (
    <Flex justifyContent="between" alignItems="center">
      <Box pos="relative">
        <HStack spacing={5}>
          {title && (
            <Heading size={1} fontWeight="semibold">
              {title}
            </Heading>
          )}

          <HStack spacing={2}>
            {isDeprecated && <DeprecatedBadge />}
            {isInternal && <InternalBadge />}
          </HStack>
        </HStack>
        <NodeAnnotation change={titleChanged} />
      </Box>
      {localStorage.getItem('use_new_mask_workflow') === 'true'
        ? null
        : exportProps && !layoutOptions?.hideExport && !isCompact && <ExportButton {...exportProps} />}
    </Flex>
  );

  const modelExamples = !layoutOptions?.hideModelExamples && <ModelExamples data={data} isCollapsible={isCompact} />;

  const descriptionChanged = nodeHasChanged?.({ nodeId, attr: 'description' });

  const getMaskProperties = (): Array<{ path: string; required?: boolean }> => {
    const disablePropsConfig = disableProps?.models;
    const absolutePathsToHide: Array<{ path: string; required?: boolean }> = [];
    if (disableProps?.models) {
      disablePropsConfig.forEach((configEntry: any) => {
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
    }
    return absolutePathsToHide;
  };

  const description = (
    <VStack spacing={10}>
      {data.description && data.type === 'object' && (
        <Box pos="relative">
          <MarkdownViewer role="textbox" markdown={data.description} />
          <NodeAnnotation change={descriptionChanged} />
        </Box>
      )}

      <NodeVendorExtensions data={data} />

      {localStorage.getItem('use_new_mask_workflow') !== 'true' && isCompact && modelExamples}
      {data && localStorage.getItem('use_new_mask_workflow') === 'true' ? (
        <LazySchemaTreePreviewer schema={data} hideData={getMaskProperties()} />
      ) : (
        <JsonSchemaViewer
          resolveRef={resolveRef}
          maxRefDepth={maxRefDepth}
          schema={getOriginalObject(data)}
          nodeHasChanged={nodeHasChanged}
          renderExtensionAddon={renderExtensionAddon}
          skipTopLevelDescription
        />
      )}
    </VStack>
  );

  return (
    <TwoColumnLayout
      ref={layoutRef}
      className={cn('Model', className)}
      header={header}
      left={description}
      right={!isCompact && modelExamples}
    />
  );
};

const ModelExamples = React.memo(({ data, isCollapsible = false }: { data: JSONSchema7; isCollapsible?: boolean }) => {
  const [chosenExampleIndex, setChosenExampleIndex] = React.useState(0);
  const [show, setShow] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const examples = React.useMemo(() => generateExamplesFromJsonSchema(data), [data]);

  const selectedExample = examples[chosenExampleIndex]?.data;

  const handleLoadMorePress = React.useCallback(() => {
    setLoading(true);
    setTimeout(() => setShow(true), 50);
  }, []);

  const examplesSelect = examples.length > 1 && (
    <Select
      aria-label="Example"
      value={String(chosenExampleIndex)}
      options={examples.map(({ label }, index) => ({ value: index, label }))}
      onChange={value => setChosenExampleIndex(parseInt(String(value), 10))}
      size="sm"
      triggerTextPrefix="Example: "
    />
  );

  return (
    <Panel rounded isCollapsible={isCollapsible} defaultIsOpen={!isCollapsible}>
      <Panel.Titlebar rightComponent={selectedExample ? <CopyButton size="sm" copyValue={selectedExample} /> : null}>
        {examplesSelect || (
          <Text color="body" role="heading">
            Example
          </Text>
        )}
      </Panel.Titlebar>
      <Panel.Content p={0}>
        {show || !exceedsSize(selectedExample) ? (
          <CodeViewer
            aria-label={selectedExample}
            noCopyButton
            maxHeight="500px"
            language="json"
            value={selectedExample}
            showLineNumbers
          />
        ) : (
          <LoadMore loading={loading} onClick={handleLoadMorePress} />
        )}
      </Panel.Content>
    </Panel>
  );
});

export const Model = withErrorBoundary<ModelProps>(ModelComponent, { recoverableProps: ['data'] });
