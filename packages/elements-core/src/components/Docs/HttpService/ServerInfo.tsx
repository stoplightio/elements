import { Box, Flex, InvertTheme, Panel, Text } from '@stoplight/mosaic';
import { IServer } from '@stoplight/types';
import * as React from 'react';

import { MockingContext } from '../../../containers/MockingProvider';
import { isProperUrl } from '../../../utils/guards';
import { getServerUrlWithDefaultValues } from '../../../utils/http-spec/IServer';

interface ServerInfoProps {
  servers?: IServer[];
  mockUrl?: string;
}

export const ServerInfo: React.FC<ServerInfoProps> = ({ servers, mockUrl }) => {
  const mocking = React.useContext(MockingContext);
  const showMocking = !mocking.hideMocking && mockUrl && isProperUrl(mockUrl);
  const productionServer = servers?.[0];
  const productionUrl = productionServer && getServerUrlWithDefaultValues(productionServer);

  return (
    <InvertTheme>
      <Panel rounded isCollapsible={false} className="BaseURLContent" w="full">
        <Panel.Titlebar whitespace="nowrap">API Base URL</Panel.Titlebar>
        <Box overflowX="auto">
          <Panel.Content w="max" className="sl-flex sl-flex-col">
            {productionUrl && isProperUrl(productionUrl) && (
              <Box whitespace="nowrap">
                {showMocking && (
                  <Text pr={2} fontWeight="bold">
                    Production:
                  </Text>
                )}
                <Text aria-label="production-server">{productionUrl}</Text>
              </Box>
            )}
            {showMocking && (
              <Flex>
                <Text fontWeight="bold">Mock Server:</Text>
                <Text aria-label="mock-server" pl={2}>
                  {mockUrl}
                </Text>
              </Flex>
            )}
          </Panel.Content>
        </Box>
      </Panel>
    </InvertTheme>
  );
};
