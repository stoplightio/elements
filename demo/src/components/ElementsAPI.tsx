import '@jpmorganchase/elemental-core/styles.css';

import { API } from '@jpmorganchase/elemental';
import { Box } from '@stoplight/mosaic';
import React, { useContext } from 'react';

import { GlobalContext } from '../context';

export const ElementsAPI: React.FC = () => {
  const { apiDescriptionUrl } = useContext(GlobalContext);

  const specUrlWithProxy =
    apiDescriptionUrl && window.location.origin === 'https://elements-demo.stoplight.io'
      ? `https://stoplight.io/cors-proxy/${apiDescriptionUrl}`
      : apiDescriptionUrl;

  console.log(specUrlWithProxy);

  return (
    <Box flex={1} overflowY="hidden">
      <API apiDescriptionUrl={specUrlWithProxy} router="hash" />
    </Box>
  );
};
