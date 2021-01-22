import { Flex, Panel, Select, Text } from '@stoplight/mosaic';
import { CodeViewer } from '@stoplight/mosaic-code-viewer';
import * as React from 'react';

import { TryItProps } from './index';

export const RequestBody: React.FC<TryItProps> = ({ httpOperation }) => {
  return (
    <Panel defaultIsOpen>
      <Panel.Titlebar rightComponent={<Select size="sm" placeholder="Examples" options={['dupa1', 'dupa2']} />}>
        Body
      </Panel.Titlebar>
      <Panel.Content>
        <CodeViewer language="json" value={JSON.stringify(httpOperation.request?.body?.contents?.[0].schema)} />
      </Panel.Content>
    </Panel>
  );
};
