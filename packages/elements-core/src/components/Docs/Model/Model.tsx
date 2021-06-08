import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';
import { Box, Flex, Heading, HStack, Panel, Text } from '@stoplight/mosaic';
import { CodeViewer } from '@stoplight/mosaic-code-viewer';
import { withErrorBoundary } from '@stoplight/react-error-boundary';
import cn from 'classnames';
import { JSONSchema7 } from 'json-schema';
import * as React from 'react';

import { useInlineRefResolver } from '../../../context/InlineRefResolver';
import { generateExampleFromJsonSchema } from '../../../utils/exampleGeneration';
import { MarkdownViewer } from '../../MarkdownViewer';
import { DocsComponentProps } from '..';
import { InternalBadge } from '../HttpOperation/Badges';

export type ModelProps = DocsComponentProps<JSONSchema7>;

const ModelComponent: React.FC<ModelProps> = ({ data, className, headless, nodeTitle }) => {
  const resolveRef = useInlineRefResolver();
  const title = data.title ?? nodeTitle;
  const isInternal = !!data['x-internal'];

  const example = React.useMemo(() => generateExampleFromJsonSchema(data), [data]);

  return (
    <div className={cn('Model', className)}>
      {!headless && title !== undefined && (
        <Heading size={1} mb={4} fontWeight="semibold">
          {title}
        </Heading>
      )}

      {isInternal && (
        <HStack spacing={2} mt={3} mb={12}>
          <InternalBadge />
        </HStack>
      )}

      {data.description && <MarkdownViewer markdown={data.description} />}

      <Flex>
        <Box flex={1}>
          <JsonSchemaViewer resolveRef={resolveRef} className={className} schema={data} />
        </Box>
        <Box ml={16} pos="relative" w="2/5" style={{ maxWidth: 500 }}>
          <Panel rounded isCollapsible={false}>
            <Panel.Titlebar>
              <Text color="body" role="heading">
                Example
              </Text>
            </Panel.Titlebar>
            <Panel.Content p={0}>
              <CodeViewer
                aria-label={example}
                noCopyButton
                maxHeight="500px"
                language="json"
                value={example}
                showLineNumbers
              />
            </Panel.Content>
          </Panel>
        </Box>
      </Flex>
    </div>
  );
};

export const Model = withErrorBoundary<ModelProps>(ModelComponent, { recoverableProps: ['data'] });
