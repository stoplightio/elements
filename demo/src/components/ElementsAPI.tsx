import '@jpmorganchase/elemental-core/styles.css';

import { API } from '@jpmorganchase/elemental';
import { Box } from '@stoplight/mosaic';
import React, { useContext } from 'react';

import { GlobalContext } from '../context';

export const ElementsAPI: React.FC = () => {
  const { apiDescriptionUrl, layout } = useContext(GlobalContext);

  const specUrlWithProxy =
    apiDescriptionUrl && window.location.origin === 'https://elements-demo.stoplight.io'
      ? `https://stoplight.io/cors-proxy/${apiDescriptionUrl}`
      : apiDescriptionUrl;

  return (
    <Box flex={1} overflowY={layout !== 'stacked' ? 'hidden' : undefined}>
      <API apiDescriptionUrl={specUrlWithProxy} router="hash" layout={layout} />
    </Box>
  );
};
