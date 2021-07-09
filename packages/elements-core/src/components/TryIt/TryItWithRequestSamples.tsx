import { Box, InvertTheme, VStack } from '@stoplight/mosaic';
import { Request as HarRequest } from 'har-format';
import * as React from 'react';

import { RequestSamples } from '../RequestSamples';
import { ResponseExamples, ResponseExamplesProps } from '../ResponseExamples/ResponseExamples';
import { TryIt, TryItProps } from './TryIt';

export type TryItWithRequestSamplesProps = Omit<TryItProps, 'onRequestChange'> &
  ResponseExamplesProps & { hideTryIt?: boolean };

export const TryItWithRequestSamples: React.FC<TryItWithRequestSamplesProps> = ({
  hideTryIt,
  tryItCredentialsPolicy,
  ...props
}) => {
  const [requestData, setRequestData] = React.useState<HarRequest | undefined>();
  return (
    <VStack spacing={6}>
      {!hideTryIt && (
        <InvertTheme>
          <Box>
            <TryIt {...props} onRequestChange={setRequestData} tryItCredentialsPolicy={tryItCredentialsPolicy} />
          </Box>
        </InvertTheme>
      )}

      {requestData && <RequestSamples request={requestData} />}

      <ResponseExamples {...props} />
    </VStack>
  );
};
