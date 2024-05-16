import { Box, InvertTheme, VStack } from '@stoplight/mosaic';
import { Request as HarRequest } from 'har-format';
import * as React from 'react';

import { extractCodeExampleOverrides, RequestSamples } from '../RequestSamples';
import { ResponseExamples, ResponseExamplesProps } from '../ResponseExamples/ResponseExamples';
import { TryIt, TryItProps } from './TryIt';

export type TryItWithRequestSamplesProps = Omit<TryItProps, 'onRequestChange'> &
  ResponseExamplesProps & { hideTryIt?: boolean };

export const TryItWithRequestSamples: React.FC<TryItWithRequestSamplesProps> = ({ hideTryIt, ...props }) => {
  const [requestData, setRequestData] = React.useState<HarRequest | undefined>();

  const codeExampleOverrides = extractCodeExampleOverrides(props.httpOperation);

  return (
    <VStack spacing={6}>
      {!hideTryIt && (
        <InvertTheme>
          <Box>
            <TryIt {...props} onRequestChange={setRequestData} />
          </Box>
        </InvertTheme>
      )}

      {requestData && <RequestSamples request={requestData} codeExampleOverrides={codeExampleOverrides} />}

      <ResponseExamples {...props} />
    </VStack>
  );
};
