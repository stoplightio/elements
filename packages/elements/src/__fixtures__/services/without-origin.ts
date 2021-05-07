import { IHttpService } from '@stoplight/types';

export const httpServiceWithoutOrigin: IHttpService = {
  id: '?http-service?',
  name: 'API, but we do not know its origin URL',
  description: 'Just an API for testing',
  version: '1.0.0',
  servers: [
    {
      url: 'api',
      name: 'Production API',
    },
    {
      url: 'https://api.staging.stoplight.io',
      name: 'Staging API',
    },
  ],
};
