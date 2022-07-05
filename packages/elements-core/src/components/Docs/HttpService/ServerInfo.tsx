import { Box, Icon, InvertTheme, Panel, Text, Tooltip, useClipboard, VStack } from '@stoplight/mosaic';
import * as React from 'react';

import { MockingContext } from '../../../containers/MockingProvider';
import { isProperUrl } from '../../../utils/guards';
import { getServersToDisplay, IServer } from '../../../utils/http-spec/IServer';

interface ServerInfoProps {
  servers: IServer[];
  variables?: { [key: string]: string };
  mockUrl?: string;
}

export const ServerInfo: React.FC<ServerInfoProps> = ({ servers, variables, mockUrl }) => {
  const mocking = React.useContext(MockingContext);
  const showMocking = !mocking.hideMocking && mockUrl && isProperUrl(mockUrl);
  const $mockUrl = showMocking ? mockUrl || mocking.mockUrl : undefined;

  const serversToDisplay = getServersToDisplay(servers, variables, $mockUrl);

  if (!showMocking && serversToDisplay.length === 0) {
    return null;
  }

  return (
    <InvertTheme>
      <Panel rounded isCollapsible={false} className="BaseURLContent" w="full">
        <Panel.Titlebar whitespace="nowrap">API Base URL</Panel.Titlebar>
        <Box overflowX="auto">
          <Panel.Content w="full" className="sl-flex sl-flex-col">
            <VStack spacing={1} divider>
              {serversToDisplay.map((server, index) => (
                <ServerUrl {...server} key={index} />
              ))}
            </VStack>
          </Panel.Content>
        </Box>
      </Panel>
    </InvertTheme>
  );
};

const ServerUrl = ({ description, url, marginBottom = true }: IServer & { marginBottom?: boolean }) => {
  const { onCopy, hasCopied } = useClipboard(url);

  return (
    <Box whitespace="nowrap">
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
    </Box>
  );
};
