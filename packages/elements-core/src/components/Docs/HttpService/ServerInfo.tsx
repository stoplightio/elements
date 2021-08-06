import { Box, Flex, InvertTheme, Panel, Text } from '@stoplight/mosaic';
import { IServer } from '@stoplight/types';
import * as React from 'react';

import { MockingContext } from '../../../containers/MockingProvider';
import { isProperUrl } from '../../../utils/guards';
import { getServerUrlWithDefaultValues } from '../../../utils/http-spec/IServer';

interface ServerInfoProps {
  servers: IServer[];
  mockUrl?: string;
}

const getServersToDisplay = (originalServers: IServer[]): IServer[] => {
  return originalServers
    .map((server, i) => ({
      ...server,
      url: getServerUrlWithDefaultValues(server),
      description: server.description || `Server ${i + 1}`,
    }))
    .filter(server => isProperUrl(server.url));
};

export const ServerInfo: React.FC<ServerInfoProps> = ({ servers, mockUrl }) => {
  const mocking = React.useContext(MockingContext);
  const showMocking = !mocking.hideMocking && mockUrl && isProperUrl(mockUrl);

  const serversToDisplay = getServersToDisplay(servers);

  if (!showMocking && serversToDisplay.length === 0) {
    return null;
  }

  return (
    <InvertTheme>
      <Panel rounded isCollapsible={false} className="BaseURLContent" w="full">
        <Panel.Titlebar whitespace="nowrap">API Base URL</Panel.Titlebar>
        <Box overflowX="auto">
          <Panel.Content w="full" className="sl-flex sl-flex-col">
            {serversToDisplay.map(({ description, url }) => (
              <Box whitespace="nowrap" mb={1} key={url}>
                <Text pr={2} fontWeight="bold">
                  {description}:
                </Text>
                <Text aria-label={description}>{url}</Text>
              </Box>
            ))}
            {showMocking && (
              <>
                <Box borderT={2} pt={2} mt={1} borderColor="light" w="full" />
                <Flex>
                  <Text fontWeight="bold">Mock Server:</Text>
                  <Text aria-label="Mock Server" pl={2}>
                    {mockUrl}
                  </Text>
                </Flex>
              </>
            )}
          </Panel.Content>
        </Box>
      </Panel>
    </InvertTheme>
  );
};
