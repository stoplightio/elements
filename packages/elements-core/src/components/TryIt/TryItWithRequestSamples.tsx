import { Box, InvertTheme, VStack } from '@stoplight/mosaic';
import { Request as HarRequest } from 'har-format';
import * as React from 'react';

import { extractCodeSampleOverrides, RequestSamples } from '../RequestSamples';
import { ResponseExamples, ResponseExamplesProps } from '../ResponseExamples/ResponseExamples';
import { TryIt, TryItProps } from './TryIt';

export type TryItWithRequestSamplesProps = Omit<TryItProps, 'onRequestChange'> &
  ResponseExamplesProps & { hideTryIt?: boolean };

export const TryItWithRequestSamples: React.FC<TryItWithRequestSamplesProps> = ({ hideTryIt, ...props }) => {
  const [requestData, setRequestData] = React.useState<HarRequest | undefined>();

  const codeSampleOverrides = extractCodeSampleOverrides(props.httpOperation);

  return (
    <VStack spacing={6}>
      {!hideTryIt && (
        <InvertTheme>
          <Box>
            <TryIt {...props} onRequestChange={setRequestData} />
          </Box>
        </InvertTheme>
      )}

      {requestData && <RequestSamples request={requestData} codeSampleOverrides={codeSampleOverrides} />}

      <ResponseExamples {...props} />
    </VStack>
  );
};
