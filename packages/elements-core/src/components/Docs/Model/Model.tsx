import { useLayoutConfig } from '@stoplight/elements-core';
import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';
import { CopyButton, Flex, Heading, HStack, Panel, Select, Text, VStack } from '@stoplight/mosaic';
import { CodeViewer } from '@stoplight/mosaic-code-viewer';
import { withErrorBoundary } from '@stoplight/react-error-boundary';
import cn from 'classnames';
import { JSONSchema7 } from 'json-schema';
import * as React from 'react';

import { useInlineRefResolver, useResolvedObject } from '../../../context/InlineRefResolver';
import { useIsCompact } from '../../../hooks/useIsCompact';
import { exceedsSize, generateExamplesFromJsonSchema } from '../../../utils/exampleGeneration/exampleGeneration';
import { getOriginalObject } from '../../../utils/ref-resolving/resolvedObject';
import { LoadMore } from '../../LoadMore';
import { MarkdownViewer } from '../../MarkdownViewer';
import { DocsComponentProps } from '..';
import { InternalBadge } from '../HttpOperation/Badges';
import { ExportButton } from '../HttpService/ExportButton';
import { TwoColumnLayout } from '../TwoColumnLayout';

export type ModelProps = DocsComponentProps<JSONSchema7>;

const ModelComponent: React.FC<ModelProps> = ({
  data: unresolvedData,
  className,
  nodeTitle,
  layoutOptions,
  exportProps,
}) => {
  const resolveRef = useInlineRefResolver();
  const data = useResolvedObject(unresolvedData) as JSONSchema7;

  const { ref: layoutRef, isCompact } = useIsCompact(layoutOptions);

  const title = data.title ?? nodeTitle;
  const isInternal = !!data['x-internal'];

  const shouldDisplayHeader =
    !layoutOptions?.noHeading && (title !== undefined || (exportProps && !layoutOptions?.hideExport));

  const header = (shouldDisplayHeader || isInternal) && (
    <Flex justifyContent="between" alignItems="center">
      <HStack spacing={5}>
        {title && (
          <Heading size={1} fontWeight="semibold">
            {title}
          </Heading>
        )}

        <HStack spacing={2}>{isInternal && <InternalBadge />}</HStack>
      </HStack>

      {exportProps && !layoutOptions?.hideExport && <ExportButton {...exportProps} />}
    </Flex>
  );

  const modelExamples = !layoutOptions?.hideModelExamples && <ModelExamples data={data} isCollapsible={isCompact} />;

  const description = (
    <VStack spacing={10}>
      {data.description && data.type === 'object' && <MarkdownViewer role="textbox" markdown={data.description} />}

      {isCompact && modelExamples}

      <JsonSchemaViewer resolveRef={resolveRef} schema={getOriginalObject(data)} />
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

  const layoutConfig = useLayoutConfig();

  const handleLoadMorePress = React.useCallback(() => {
    setLoading(true);
    setTimeout(() => setShow(true), 50);
  }, []);

  const examplesSelect = examples.length > 1 && (
    <Select
      aria-label="Example"
      value={String(chosenExampleIndex)}
      options={examples.map(({ label }, index) => ({ value: index, label }))}
      onChange={(value: string | number) => setChosenExampleIndex(parseInt(String(value), 10))}
      size="sm"
      triggerTextPrefix="Example: "
    />
  );

  return (
    <Panel rounded isCollapsible={isCollapsible} defaultIsOpen={!isCollapsible}>
      <Panel.Titlebar rightComponent={selectedExample ? <CopyButton size="sm" copyValue={selectedExample} /> : null}>
        {examplesSelect || (
          <Text color="body" role="heading">
            {layoutConfig?.modelExamples?.title ?? 'Example'}
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
