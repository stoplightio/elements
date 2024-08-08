import { Box, Flex, NodeAnnotation, Select, VStack } from '@stoplight/mosaic';
import { IHttpCallbackOperation } from '@stoplight/types';
import * as React from 'react';

import { useOptionsCtx } from '../../../context/Options';
import { MarkdownViewer } from '../../MarkdownViewer';
import { ExtensionAddonRenderer } from '../Docs';
import { SectionSubtitle, SectionTitle } from '../Sections';
import { OperationHeader } from './HttpOperation';
import { Request } from './Request';
import { Responses } from './Responses';

export interface CallbacksProps {
  callbacks: IHttpCallbackOperation[];
  isCompact?: boolean;
}

export interface CallbackProps {
  data: IHttpCallbackOperation;
  isCompact?: boolean;
  renderExtensionAddon?: ExtensionAddonRenderer;
}

export const Callbacks = ({ callbacks, isCompact }: CallbacksProps) => {
  const [selectedCallbackIndex, setSelectedCallbackIndex] = React.useState(0);

  const callback = React.useMemo(() => callbacks[selectedCallbackIndex], [callbacks, selectedCallbackIndex]);

  return (
    <VStack spacing={8}>
      <SectionTitle title="Callbacks" isCompact={isCompact}>
        {callbacks.length > 0 && (
          <Flex flex={1} justify="end">
            <Select
              aria-label="Callback"
              value={String(selectedCallbackIndex)}
              onChange={value => setSelectedCallbackIndex(parseInt(String(value), 10))}
              options={callbacks.map((c, index) => ({
                label: `${c.key} - ${c.path} - ${c.method}`,
                value: index,
              }))}
              size="sm"
            />
          </Flex>
        )}
      </SectionTitle>

      {callback && <Callback data={callback} isCompact={isCompact} />}
    </VStack>
  );
};

Callbacks.displayName = 'HttpOperation.Callbacks';

export const Callback = ({ data, isCompact }: CallbackProps) => {
  const { nodeHasChanged } = useOptionsCtx();

  const isDeprecated = !!data.deprecated;
  const isInternal = !!data.internal;

  const descriptionChanged = nodeHasChanged?.({ nodeId: data.id, attr: 'description' });

  return (
    <VStack spacing={10}>
      <Box>
        <SectionSubtitle title={data.key} id="callback-key"></SectionSubtitle>
        <OperationHeader
          id={data.id}
          method={data.method}
          path={data.path}
          isDeprecated={isDeprecated}
          isInternal={isInternal}
          hideServerUrl
        />
      </Box>
      {data.description && (
        <Box pos="relative">
          <MarkdownViewer className="HttpOperation__Description" markdown={data.description} />
          <NodeAnnotation change={descriptionChanged} />
        </Box>
      )}

      <Request operation={data} />

      {data.responses && <Responses responses={data.responses} isCompact={isCompact} />}
    </VStack>
  );
};
Callbacks.displayName = 'HttpOperation.Callback';
