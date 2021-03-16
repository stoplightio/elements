import { InvertTheme, Panel, subscribeTheme, Text } from '@stoplight/mosaic';
import { IServer } from '@stoplight/types';
import * as React from 'react';

import { ActiveInfoContext } from '../../../containers/Provider';

interface ServerInfoProps {
  serverUrl: IServer[] | undefined;
  mockUrl: string | undefined;
}

export const ServerInfo: React.FC<ServerInfoProps> = ({ serverUrl, mockUrl }) => {
  const info = React.useContext(ActiveInfoContext);

  const properUrl = new RegExp(
    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/,
  );
  const productionUrl = serverUrl?.[0].url;

  subscribeTheme({ mode: 'light' });

  if (!mockUrl?.match(properUrl) && !productionUrl?.match(properUrl)) {
    return null;
  }

  return (
    <InvertTheme>
      <Panel rounded isCollapsible={false} className="BaseURLContent" w="full">
        <Panel.Titlebar whitespace="nowrap">API Base URL</Panel.Titlebar>
        <div className="overflow-x-auto">
          <Panel.Content w="max" className="flex flex-col">
            {productionUrl?.match(properUrl) && (
              <div className="whitespace-nowrap">
                <Text fontWeight="bold">Production:</Text>
                <Text aria-label="production-server" pl={2}>
                  {productionUrl}
                </Text>
              </div>
            )}
            {info.isStoplightProjectComponent && mockUrl?.match(properUrl) && (
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
