import '@stoplight/elements/styles/elements.scss';

import { API } from '@stoplight/elements';
import React from 'react';

export const ElementsAPI: React.FC = () => {
  return (
    <div className="stoplight-container">
      <API
        basePath="zoom-api"
        apiDescriptionUrl="https://raw.githubusercontent.com/stoplightio/Public-APIs/master/reference/zoom/zoom.yaml"
        router="memory"
      />
    </div>
  );
};
