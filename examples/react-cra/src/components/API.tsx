import '@stoplight/elements/styles/elements.scss';

import { API } from '@stoplight/elements';
import React from 'react';

export const StoplightAPI: React.FC = () => {
  return (
    <API
      basePath="zoom-api"
      apiDescriptionUrl="https://raw.githubusercontent.com/stoplightio/Public-APIs/master/reference/zoom/openapi.yaml"
    />
  );
};
