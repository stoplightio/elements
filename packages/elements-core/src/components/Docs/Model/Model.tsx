import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';
import { Box, Button, Flex, Heading, HStack, Panel, Select, Text } from '@stoplight/mosaic';
import { CodeViewer } from '@stoplight/mosaic-code-viewer';
import { withErrorBoundary } from '@stoplight/react-error-boundary';
import cn from 'classnames';
import { JSONSchema7 } from 'json-schema';
import * as React from 'react';

import { useInlineRefResolver, useResolvedObject } from '../../../context/InlineRefResolver';
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
  const [chosenExampleIndex, setChosenExampleIndex] = React.useState(0);
  const [show, setShow] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const resolveRef = useInlineRefResolver();
  const data = useResolvedObject(unresolvedData) as JSONSchema7;

  const title = data.title ?? nodeTitle;
  const isInternal = !!data['x-internal'];

  const handlePress = () => {
    setLoading(true);
    setTimeout(() => setShow(true), 50);
  };

  const examples = React.useMemo(() => generateExamplesFromJsonSchema(data), [data]);

  const shouldDisplayHeader =
    !layoutOptions?.noHeading && (title !== undefined || (exportProps && !layoutOptions?.hideExport));

  const header = (shouldDisplayHeader || isInternal) && (
    <>
      {shouldDisplayHeader && (
        <Flex justifyContent="between" alignItems="center">
          <Heading size={1} mb={4} fontWeight="semibold">
            {title}
          </Heading>
          {exportProps && !layoutOptions?.hideExport && <ExportButton {...exportProps} />}
        </Flex>
      )}

      {isInternal && (
        <HStack spacing={2} mb={12}>
          <InternalBadge />
        </HStack>
      )}
    </>
  );

  const description = (
    <>
      {data.description && data.type === 'object' && (
        <MarkdownViewer className="sl-mb-6" role="textbox" markdown={data.description} />
      )}
      <JsonSchemaViewer resolveRef={resolveRef} schema={getOriginalObject(data)} />
    </>
  );

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

  const modelExamples = !layoutOptions?.hideModelExamples && (
    <Panel rounded isCollapsible={false}>
      <Panel.Titlebar>
        {examplesSelect || (
          <Text color="body" role="heading">
            Example
          </Text>
        )}
      </Panel.Titlebar>
      <Panel.Content p={0}>
        {(exceedsSize(examples[chosenExampleIndex].data) && show) || !exceedsSize(examples[chosenExampleIndex].data) ? (
          <CodeViewer
            aria-label={examples[chosenExampleIndex].data}
            noCopyButton
            maxHeight="500px"
            language="json"
            value={examples[chosenExampleIndex].data}
            showLineNumbers
          />
        ) : (
          <LoadMore loading={loading} onChange={handlePress} />
        )}
      </Panel.Content>
    </Panel>
  );

  return (
    <TwoColumnLayout className={cn('Model', className)} header={header} left={description} right={modelExamples} />
  );
};

export const Model = withErrorBoundary<ModelProps>(ModelComponent, { recoverableProps: ['data'] });
