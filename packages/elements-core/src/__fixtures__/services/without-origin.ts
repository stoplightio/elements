import { IHttpService } from '@stoplight/types';

export const httpServiceWithoutOrigin: IHttpService = {
  id: '?http-service?',
  name: 'API, but we do not know its origin URL',
  description: 'Just an API for testing',
  version: '1.0.0',
  servers: [
    {
      id: '?http-server-0?',
      url: 'api',
      description: 'Production API',
    },
    {
      id: '?http-server-1?',
      url: 'https://api.staging.stoplight.io',
      description: 'Staging API',
    },
  ],
};
