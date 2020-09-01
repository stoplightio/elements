import '@stoplight/elements/styles/elements.scss';

import { API } from '@stoplight/elements';
import React from 'react';

export const StoplightAPI: React.FC = () => {
  return (
    <div>
      <API
        basePath="API"
        apiDescriptionUrl="https://raw.githubusercontent.com/stoplightio/studio-demo/master/reference/todos/openapi.v1.json"
      ></API>
    </div>
  );
};
