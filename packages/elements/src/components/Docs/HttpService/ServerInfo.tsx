import { Panel, Text } from '@stoplight/mosaic';
import { IServer } from '@stoplight/types';
import { ActiveInfoContext } from 'elements/src/containers/Provider';
import * as React from 'react';

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

  if (!mockUrl?.match(properUrl) && !productionUrl?.match(properUrl)) {
    return null;
  }

  return (
    <Panel rounded isCollapsible={false}>
      <Panel.Titlebar>API Base URL</Panel.Titlebar>
      <Panel.Content className="flex flex-col">
        {productionUrl?.match(properUrl) && <Text>{`Production: ${productionUrl}`}</Text>}
        {info.isStoplightProjectComponent && mockUrl?.match(properUrl) && <Text>{`Mock Server: ${mockUrl}`}</Text>}
      </Panel.Content>
    </Panel>
  );
};
