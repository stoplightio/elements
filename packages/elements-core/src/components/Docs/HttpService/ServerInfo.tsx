import { InvertTheme, Panel, Text } from '@stoplight/mosaic';
import { IServer } from '@stoplight/types';
import * as React from 'react';

import { ActiveInfoContext } from '../../../containers/Provider';
import { isProperUrl } from '../../../utils/guards';
import { getServerUrlWithDefaultValues } from '../../../utils/http-spec/IServer';

interface ServerInfoProps {
  servers?: IServer[];
  mockUrl?: string;
}

export const ServerInfo: React.FC<ServerInfoProps> = ({ servers, mockUrl }) => {
  const info = React.useContext(ActiveInfoContext);
  const productionServer = servers?.[0];
  const productionUrl = productionServer && getServerUrlWithDefaultValues(productionServer);

  return (
    <InvertTheme>
      <Panel rounded isCollapsible={false} className="BaseURLContent" w="full">
        <Panel.Titlebar whitespace="nowrap">API Base URL</Panel.Titlebar>
        <div className="overflow-x-auto">
          <Panel.Content w="max" className="flex flex-col">
            {productionUrl && isProperUrl(productionUrl) && (
              <div className="whitespace-nowrap">
                {info.showMocking && (
                  <Text pr={2} fontWeight="bold">
                    Production:
                  </Text>
                )}
                <Text aria-label="production-server">{productionUrl}</Text>
              </div>
            )}
            {info.showMocking && mockUrl && isProperUrl(mockUrl) && (
              <div className="flex flex-row">
                <Text fontWeight="bold">Mock Server:</Text>
                <Text aria-label="mock-server" pl={2}>
                  {mockUrl}
                </Text>
              </div>
            )}
          </Panel.Content>
        </div>
      </Panel>
    </InvertTheme>
  );
};
