import { InvertTheme, Panel, Text } from '@stoplight/mosaic';
import { IServer } from '@stoplight/types';
import * as React from 'react';

import { ActiveInfoContext } from '../../../containers/Provider';
import { isProperUrl } from '../../../utils/guards';

interface ServerInfoProps {
  servers: IServer[] | undefined;
  mockUrl: string | undefined;
}

export const ServerInfo: React.FC<ServerInfoProps> = ({ servers, mockUrl }) => {
  const info = React.useContext(ActiveInfoContext);
  const productionUrl = servers?.[0].url;

  return (
    <InvertTheme>
      <Panel rounded isCollapsible={false} className="BaseURLContent" w="full">
        <Panel.Titlebar whitespace="nowrap">API Base URL</Panel.Titlebar>
        <div className="overflow-x-auto">
          <Panel.Content w="max" className="flex flex-col">
            {productionUrl && isProperUrl(productionUrl) && (
              <div className="whitespace-nowrap">
                {info.isStoplightProjectComponent && (
                  <Text pr={2} fontWeight="bold">
                    Production:
                  </Text>
                )}
                <Text aria-label="production-server">{productionUrl}</Text>
              </div>
            )}
            {info.isStoplightProjectComponent && mockUrl && isProperUrl(mockUrl) && (
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
