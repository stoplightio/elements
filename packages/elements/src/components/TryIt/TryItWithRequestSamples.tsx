import { Box } from '@stoplight/mosaic';
import { Request as HarRequest } from 'har-format';
import * as React from 'react';

import { RequestSamples } from '../RequestSamples';
import { TryIt, TryItProps } from './TryIt';

export type TryItWithRequestSamplesProps = Omit<TryItProps, 'onRequestChange'>;

export const TryItWithRequestSamples: React.FC<TryItWithRequestSamplesProps> = props => {
  const [requestData, setRequestData] = React.useState<HarRequest | undefined>();

  return (
    <div>
      <Box mb={3}>
        <TryIt {...props} onRequestChange={setRequestData} />
      </Box>
      {requestData && (
        <Box mb={3}>
          <RequestSamples request={requestData} />
        </Box>
      )}
    </div>
  );
};
