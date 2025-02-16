import {
  IOauth2AuthorizationCodeFlow,
  IOauth2ClientCredentialsFlow,
  IOauth2ImplicitFlow,
  IOauth2PasswordFlow,
} from '@stoplight/types';

import { getDefaultDescription } from '../securitySchemes';

describe('getDefaultDescription()', () => {
  it('should handle implicit flow', () => {
    const flow: IOauth2ImplicitFlow = {
      authorizationUrl: 'http://authorizationURL',
      scopes: { 'scope:implicit': 'implicit scope description', 'scope:read': 'read scope description' },
    };

    const description = getDefaultDescription({
      id: 'http-security-oauth2-implicit',
      key: 'oauth2-implicit',
      type: 'oauth2',
      flows: { implicit: flow },
    });

    expect(description).toMatchInlineSnapshot(`
      "**Implicit OAuth Flow**

      Authorize URL: http://authorizationURL

      Scopes:
      - \`scope:implicit\` - implicit scope description
      - \`scope:read\` - read scope description"
    `);
  });

  it('should handle authorization code flow', () => {
    const flow: IOauth2AuthorizationCodeFlow = {
      authorizationUrl: 'http://authorizationURL',
      tokenUrl: 'http://tokenURL',
      refreshUrl: 'http://refreshURL',
      scopes: { 'scope:authorizationCode': 'authorizationCode scope description' },
    };

    const description = getDefaultDescription({
      id: 'http-security-oauth2-authorizationCode',
      key: 'oauth2-authorizationCode',
      type: 'oauth2',
      flows: { authorizationCode: flow },
    });

    expect(description).toMatchInlineSnapshot(`
      "**Authorization Code OAuth Flow**

      Authorize URL: http://authorizationURL

      Token URL: http://tokenURL

      Refresh URL: http://refreshURL

      Scopes:
      - \`scope:authorizationCode\` - authorizationCode scope description"
    `);
  });

  it('should handle client credentials flow', () => {
    const flow: IOauth2ClientCredentialsFlow = {
      tokenUrl: 'http://tokenURL',
      scopes: { 'scope:clientCredentials': 'clientCredentials scope description' },
    };

    const description = getDefaultDescription({
      id: 'http-security-oauth2-clientCredentials',
      key: 'oauth2-clientCredentials',
      type: 'oauth2',
      flows: { clientCredentials: flow },
    });

    expect(description).toMatchInlineSnapshot(`
      "**Client Credentials OAuth Flow**

      Token URL: http://tokenURL

      Scopes:
      - \`scope:clientCredentials\` - clientCredentials scope description"
    `);
  });

  it('should handle password flow', () => {
    const flow: IOauth2PasswordFlow = {
      tokenUrl: 'http://tokenURL',
      scopes: { 'scope:password': 'password scope description' },
    };

    const description = getDefaultDescription({
      id: 'http-security-oauth2-password',
      key: 'oauth2-password',
      type: 'oauth2',
      flows: { password: flow },
    });

    expect(description).toMatchInlineSnapshot(`
      "**Password OAuth Flow**

      Token URL: http://tokenURL

      Scopes:
      - \`scope:password\` - password scope description"
    `);
  });

  it('should handle api key flow with roles', () => {
    const description = getDefaultDescription({
      id: 'security-apikey-access-token',
      key: 'apikey-access-token',
      type: 'apiKey',
      name: 'access_token',
      in: 'query',
      extensions: { ['x-scopes']: ['image:read', 'user:read'] },
    });

    expect(description).toContain('Roles: `image:read`, `user:read`');
  });

  it.each<'bearer' | 'basic' | 'digest'>(['bearer', 'basic', 'digest'])(
    'should handle http %s flow with roles',
    scheme => {
      const description = getDefaultDescription({
        id: 'security-http-access-token',
        key: 'http-access-token',
        type: 'http',
        scheme,
        extensions: { ['x-scopes']: ['image:read', 'user:read'] },
      });

      expect(description).toContain('Roles: `image:read`, `user:read`');
    },
  );
});
