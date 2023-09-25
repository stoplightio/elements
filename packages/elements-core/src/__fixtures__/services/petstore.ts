import { IHttpService } from '@stoplight/types';

export const httpService: IHttpService = {
  id: '?http-service?',
  name: 'Petstore (OpenAPI v3)',
  description:
    'This is a sample server Petstore server.  You can find out more about Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).  For this sample, you can use the api key `special-key` to test the authorization filters. \n\n',
  termsOfService: 'https://terms-of-service.com',
  contact: {
    name: 'Support',
    url: 'https://stoplight.io',
    email: 'support@stoplight.io',
  },
  license: {
    name: 'Apache 2.0',
    url: 'https://www.apache.org/licenses/LICENSE-2.0.txt',
  },
  version: '1.0.0',
  servers: [
    {
      id: '?http-server-0?',
      url: 'https://api.stoplight.io',
      description: 'Production API',
    },
    {
      id: '?http-server-1?',
      url: 'https://api.{environment}.stoplight.io',
      description: 'Staging API',
      variables: {
        environment: {
          description: 'The kind of a durable test environment',
          enum: ['staging', 'int'],
          default: 'staging',
        },
      },
    },
    {
      id: '?http-server-3?',
      url: 'https://localhost:{port}',
      description: 'Development API',
      variables: {
        port: {
          enum: ['8443', '443'],
          default: '8443',
        },
      },
    },
  ],
  securitySchemes: [],
  security: [],
};

export default httpService;
