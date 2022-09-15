import { Box, Icon, InvertTheme, NodeAnnotation, Panel, Text, Tooltip, useClipboard, VStack } from '@stoplight/mosaic';
import type { IServer } from '@stoplight/types';
import * as React from 'react';

import { MockingContext } from '../../../containers/MockingProvider';
import { useOptionsCtx } from '../../../context/Options';
import { isProperUrl } from '../../../utils/guards';
import { getServersToDisplay } from '../../../utils/http-spec/IServer';

interface ServerInfoProps {
  servers: IServer[];
  mockUrl?: string;
}

export const ServerInfo: React.FC<ServerInfoProps> = ({ servers, mockUrl }) => {
  const mocking = React.useContext(MockingContext);
  const showMocking = !mocking.hideMocking && mockUrl && isProperUrl(mockUrl);
  const $mockUrl = showMocking ? mockUrl || mocking.mockUrl : undefined;

  const serversToDisplay = getServersToDisplay(servers, $mockUrl);

  if (!showMocking && serversToDisplay.length === 0) {
    return null;
  }

  return (
    <InvertTheme>
      <Panel rounded isCollapsible={false} className="BaseURLContent" w="full">
        <Panel.Titlebar whitespace="nowrap">API Base URL</Panel.Titlebar>
        <Panel.Content w="full" className="sl-flex sl-flex-col">
          <VStack spacing={1} divider>
            {serversToDisplay.map((server, index) => (
              <ServerUrl {...server} key={index} />
            ))}
          </VStack>
        </Panel.Content>
      </Panel>
    </InvertTheme>
  );
};

const ServerUrl = ({ id, description, url }: IServer) => {
  const { nodeHasChanged } = useOptionsCtx();
  const { onCopy, hasCopied } = useClipboard(url);
  const hasChanged = nodeHasChanged?.({ nodeId: id });

  return (
    <Box whitespace="nowrap" pos="relative">
      <Text pr={2} fontWeight="bold">
        {description}:
      </Text>
      <Tooltip placement="right" renderTrigger={() => <Text aria-label={description}>{url}</Text>}>
        {!hasCopied && (
          <Box p={1} onClick={onCopy} cursor="pointer">
            Copy Server URL <Icon className="sl-ml-1" icon={['fas', 'copy']} />
          </Box>
        )}
        {hasCopied && (
          <Box p={1}>
            Copied Server URL <Icon className="sl-ml-1" icon={['fas', 'check']} />
          </Box>
        )}
      </Tooltip>

      <NodeAnnotation change={hasChanged} additionalLeftOffset={16} />
    </Box>
  );
};
