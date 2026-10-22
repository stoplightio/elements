import '@stoplight/elements/styles.min.css';

import { API } from '@stoplight/elements';

// Sends the requests of "Try It" through a CORS proxy, with credentials, the way an app that hosts the
// documentation of APIs that don't allow cross-origin requests would.
export const ProxiedAPI = () => {
  return (
    <API
      router="history"
      basePath="proxied-api"
      apiDescriptionUrl="https://example.com/orders.openapi.yaml"
      tryItCorsProxy="https://proxy.example.com/"
      tryItCredentialsPolicy="include"
    />
  );
};
