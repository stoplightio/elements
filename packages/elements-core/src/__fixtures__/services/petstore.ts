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
      url: 'https://api.stoplight.io',
      description: 'Production API',
    },
    {
      url: 'https://api.staging.stoplight.io',
      description: 'Staging API',
    },
    {
      url: 'https://api.int.stoplight.io',
      description: 'Integration API',
    },
    {
      url: 'https://localhost:4060',
      description: 'Development API',
    },
  ],
  security: [],
  securitySchemes: [
    {
      key: 'oauth_scheme',
      type: 'oauth2',
      description:
        'Get access to data while protecting your account credentials. OAuth2 is also a safer and more secure way to give you access.',
      flows: {
        implicit: {
          authorizationUrl: 'https://implicit.authorization-url.com',
          refreshUrl: 'https://implicit.refresh-url.com',
          scopes: { 'scope:implicit': 'implicit scope description' },
        },
        password: {
          tokenUrl: 'https://password.token-url.com',
          refreshUrl: 'https://password.refresh-url.com',
          scopes: { 'scope:password': 'password scope description' },
        },
        clientCredentials: {
          tokenUrl: 'https://clientCredentials.token-url.com',
          refreshUrl: 'https://clientCredentials.refresh-url.com',
          scopes: { 'scope:clientCredentials': 'clientCredentials scope description' },
        },
        authorizationCode: {
          authorizationUrl: 'https://authorizationCode.authorization-url.com',
          tokenUrl: 'https://authorizationCode.token-url.com',
          refreshUrl: 'https://authorizationCode.refresh-url.com',
          scopes: { 'scope:authorizationCode': 'authorizationCode scope description' },
        },
      },
    },
  ],
};

export default httpService;
