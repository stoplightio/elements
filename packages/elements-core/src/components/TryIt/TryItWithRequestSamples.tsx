import { Box, InvertTheme, Panel, VStack } from '@stoplight/mosaic';
import { Request as HarRequest } from 'har-format';
import * as React from 'react';

import { RequestSamples } from '../RequestSamples';
import { ResponseExamples, ResponseExamplesProps } from '../ResponseExamples/ResponseExamples';
import { TryIt, TryItProps } from './TryIt';

export type TryItWithRequestSamplesProps = Omit<TryItProps, 'onRequestChange'> &
  ResponseExamplesProps & { hideTryIt?: boolean };

export const TryItWithRequestSamples: React.FC<TryItWithRequestSamplesProps> = ({ hideTryIt, ...props }) => {
  const [requestData, setRequestData] = React.useState<HarRequest | undefined>();
  return (
    <VStack spacing={6}>
      {!hideTryIt && (
        <InvertTheme>
          <Box>
            <Panel rounded isCollapsible={false} defaultIsOpen>
              <Panel.Titlebar></Panel.Titlebar>
              <TryIt {...props} onRequestChange={setRequestData} />
              {requestData && <RequestSamples request={requestData} isConnected />}
              <ResponseExamples {...props} isConnected />
            </Panel>
          </Box>
        </InvertTheme>
      )}
    </VStack>
  );
};
