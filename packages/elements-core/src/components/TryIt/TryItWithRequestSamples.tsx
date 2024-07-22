import { Box, InvertTheme, VStack } from '@stoplight/mosaic';
import { Request as HarRequest } from 'har-format';
import * as React from 'react';

import ExamplesContext from '../../context/ExamplesContext';
import { extractCodeSamples, RequestSamples } from '../RequestSamples';
import { ResponseExamples, ResponseExamplesProps } from '../ResponseExamples/ResponseExamples';
import { TryIt, TryItProps } from './TryIt';

export type TryItWithRequestSamplesProps = Omit<TryItProps, 'onRequestChange'> &
  ResponseExamplesProps & { hideTryIt?: boolean; hideSamples?: boolean, hideInlineExamples?: boolean };

export const TryItWithRequestSamples: React.FC<TryItWithRequestSamplesProps> = ({
  hideTryIt,
  hideSamples,
  hideInlineExamples = false,
  ...props
}) => {
  const [requestData, setRequestData] = React.useState<HarRequest | undefined>();

  const [globalSelectedExample, setGlobalSelectedExample] = React.useState('');
  const customCodeSamples = extractCodeSamples(props.httpOperation);

  return (
    <ExamplesContext.Provider value={{ globalSelectedExample, setGlobalSelectedExample, hideInlineExamples }}>
      <VStack spacing={6}>
        {!hideTryIt && (
          <InvertTheme>
            <Box>
              <TryIt {...props} onRequestChange={setRequestData} hideInlineExamples={hideInlineExamples} />
            </Box>
          </InvertTheme>
        )}

        {requestData && !hideSamples && <RequestSamples request={requestData} customCodeSamples={customCodeSamples} />}

        <ResponseExamples {...props} />
      </VStack>
    </ExamplesContext.Provider>
  );
};
