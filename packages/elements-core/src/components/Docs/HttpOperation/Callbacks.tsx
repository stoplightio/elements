import { Box, Panel, VStack } from '@stoplight/mosaic';
import { IHttpOperation } from '@stoplight/types';
import * as React from 'react';

import { SectionTitle } from '../Sections';
import { HttpOperation } from './HttpOperation';

interface ICallbacksProps {
  callbacks: IHttpOperation[];
}
export const Callbacks = ({ callbacks }: ICallbacksProps) => {
  return (
    <VStack spacing={8}>
      <SectionTitle title="Callbacks" />
      <div>
        {callbacks?.map(callback => (
          <Panel rounded isCollapsible={true} key={`callback-${callback.id}`}>
            <Panel.Titlebar bg="canvas-300">
              <Box as="span">
                {callback.path}
              </Box>
            </Panel.Titlebar>
            <Panel.Content p={4}>
              <HttpOperation data={callback} layoutOptions={{ hideTryItPanel: true }} isCallback={true} />
            </Panel.Content>
          </Panel>
        ))}
      </div>
    </VStack>
  );
};
