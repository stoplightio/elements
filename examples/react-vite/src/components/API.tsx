import '@stoplight/elements/styles.min.css';

import { API } from '@stoplight/elements';

export const StoplightAPI = () => {
  return (
    <API
      router="history"
      basePath="zoom-api"
      apiDescriptionUrl="https://raw.githubusercontent.com/stoplightio/Public-APIs/master/reference/zoom/openapi.yaml"
    />
  );
};
