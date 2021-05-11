import '@stoplight/elements-core/styles/elements.scss';

import { API } from '@stoplight/elements';
import { Box } from '@stoplight/mosaic';
import React, { useContext } from 'react';

import { GlobalContext } from '../context';

export const ElementsAPI: React.FC = () => {
  const state = useContext(GlobalContext);

  return (
    <Box flex={1} overflowY="hidden">
      <API apiDescriptionUrl={state.apiDescriptionUrl} router="hash" />
    </Box>
  );
};
