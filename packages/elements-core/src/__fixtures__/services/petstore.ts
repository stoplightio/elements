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
  security: [
    [
      {
        id: '?http-security-0?',
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
    [
      {
        id: '?http-security-api_key?',
        key: 'api_key',
        type: 'apiKey',
        name: 'API Key',
        in: 'query',
        description: "Use `?apikey=123` to authenticate requests. It's super secure.",
      },
      {
        id: '?http-security-api_key2?',
        key: 'api_key2',
        type: 'apiKey',
        name: 'Alternate API key',
        in: 'query',
        description: "Use `?apikey=123` to authenticate requests. It's super secure.",
      },
    ],
    [
      {
        id: '?http-security-openIdConnectKey?',
        key: 'openIdConnectKey',
        type: 'openIdConnect',
        description:
          'Get access to data while protecting your account credentials. OAuth2 is also a safer and more secure way to give you access.',
        openIdConnectUrl: 'http://openIdConnect.com',
      },
    ],
    [],
    [
      {
        id: '?http-security-oauth2Key?',
        key: 'oauth2Key',
        type: 'oauth2',
        description:
          'Get access to data while protecting your account credentials. OAuth2 is also a safer and more secure way to give you access.',
        flows: {
          implicit: {
            scopes: {
              'write:pets': 'modify pets in your account',
              'read:pets': 'read your pets',
            },
            refreshUrl: 'http://refreshUrl.com',
            authorizationUrl: 'http://authorizationUrl.com',
          },
          password: {
            scopes: {
              'write:pets': 'modify pets in your account',
              'read:pets': 'read your pets',
            },
            refreshUrl: 'http://refreshUrl.com',
            tokenUrl: 'http://tokenUrl.com',
          },
          clientCredentials: {
            scopes: {
              'write:pets': 'modify pets in your account',
              'read:pets': 'read your pets',
            },
            refreshUrl: 'http://refreshUrl.com',
            tokenUrl: 'http://tokenUrl.com',
          },
          authorizationCode: {
            scopes: {
              'write:pets': 'modify pets in your account',
              'read:pets': 'read your pets',
            },
            refreshUrl: 'http://refreshUrl.com',
            tokenUrl: 'http://tokenUrl.com',
            authorizationUrl: 'http://authorizationUrl.com',
          },
        },
      },
      {
        id: '?http-security-api_key?',
        key: 'api_key',
        type: 'apiKey',
        name: 'API Key',
        in: 'query',
        description: "Use `?apikey=123` to authenticate requests. It's super secure.",
      },
    ],
  ],
};

export default httpService;
