import { HttpSecurityScheme } from '@stoplight/types';

export const apiKey: HttpSecurityScheme = {
  key: 'apiKey',
  type: 'apiKey',
  in: 'query',
  name: 'apikey',
};

export const oauth: HttpSecurityScheme = {
  key: 'oauth_scheme',
  type: 'oauth2',
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
};
