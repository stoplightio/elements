import { Box, InvertTheme, VStack } from '@stoplight/mosaic';
import { Request as HarRequest } from 'har-format';
import * as React from 'react';

import { isHttpOperation } from '../../utils/guards';
import { RequestSamples } from '../RequestSamples';
import { ResponseExamples, ResponseExamplesProps } from '../ResponseExamples/ResponseExamples';
import { TryIt, TryItProps } from './TryIt';

export type TryItWithRequestSamplesProps = Omit<TryItProps, 'onRequestChange'> &
  ResponseExamplesProps & { hideTryIt?: boolean };

export const TryItWithRequestSamples: React.FC<TryItWithRequestSamplesProps> = ({ hideTryIt, ...props }) => {
  const [requestData, setRequestData] = React.useState<HarRequest | undefined>();

  let codeExampleOverrides = [];
  const { httpOperation } = props;
  if (isHttpOperation(httpOperation)) {
    if ('x-codeExamples' in httpOperation) {
      codeExampleOverrides = httpOperation['x-codeExamples'] as any[];
    }
  }

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
