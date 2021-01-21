import '@stoplight/elements/styles/elements.scss';

import { API } from '@stoplight/elements';
import React from 'react';

export const StoplightAPI: React.FC = () => {
  return (
    <div className="stoplight-container">
      <API
        basePath="stoplight-api"
        apiDescriptionUrl="https://raw.githubusercontent.com/stoplightio/Public-APIs/master/reference/zoom/zoom.yaml"
      />
    </div>
  );
};
