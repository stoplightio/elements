import { InvertTheme, Panel, subscribeTheme, Text } from '@stoplight/mosaic';
import { IServer } from '@stoplight/types';
import * as React from 'react';

import { IActiveInfo } from '../../../containers/Provider';

interface ServerInfoProps {
  serverUrl: IServer[] | undefined;
  mockUrl: string | undefined;
  activeContextInfo: IActiveInfo;
}

export const ServerInfo: React.FC<ServerInfoProps> = ({ serverUrl, mockUrl, activeContextInfo }) => {
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
      <Panel rounded isCollapsible={false} className="BaseURLContent">
        <Panel.Titlebar whitespace="nowrap">API Base URL</Panel.Titlebar>
        <Panel.Content className="flex flex-col">
          {productionUrl?.match(properUrl) && (
            <div className="whitespace-nowrap">
              <Text whitespace="nowrap" fontWeight="bold">
                Production:
              </Text>
              <Text aria-label="production-server" pl={2}>
                {productionUrl}
              </Text>
            </div>
          )}
          {activeContextInfo.isStoplightProjectComponent && mockUrl?.match(properUrl) && (
            <div className="flex flex-row">
              <Text whitespace="nowrap" fontWeight="bold">
                Mock Server:
              </Text>
              <Text aria-label="mock-server" pl={2}>
                {mockUrl}
              </Text>
            </div>
          )}
        </Panel.Content>
      </Panel>
    </InvertTheme>
  );
};
