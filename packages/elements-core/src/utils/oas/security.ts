import {
  HttpSecurityScheme,
  IOauth2AuthorizationCodeFlow,
  IOauth2ClientCredentialsFlow,
  IOauth2Flow,
  IOauth2ImplicitFlow,
  IOauth2PasswordFlow,
  IOauth2SecurityScheme,
} from '@stoplight/types';
import { capitalize, flatMap, isObject, keys, uniq } from 'lodash';

export function getReadableSecurityName(securityScheme: HttpSecurityScheme, includeScope: boolean = false) {
  switch (securityScheme.type) {
    case 'apiKey':
      return 'API Key';
    case 'http':
      return `${capitalize(securityScheme.scheme)} Auth`;
    case 'oauth2':
      const scopes = uniq(flatMap(keys(securityScheme.flows), getOauthScopeMapper(securityScheme)));
      if (includeScope && scopes.length > 1) {
        return `OAuth 2.0 (${scopes.join(', ')})`;
      }
      return 'OAuth 2.0';
    case 'openIdConnect':
      return 'OpenID Connect';
    case 'mutualTLS':
      return 'Mutual TLS';
  }
}

const getOauthScopeMapper = (securityScheme: IOauth2SecurityScheme) => (flow: string) => {
  if (!['implicit', 'password', 'clientCredentials', 'authorizationCode'].includes(flow)) return [];
  return keys(securityScheme.flows[flow]?.scopes);
};

export function getServiceUriFromOperation(uri: string) {
  const match = uri?.match(/(.*)\/(paths|operations)/);
  return match && match.length > 1 ? match[1] || '/' : undefined;
}

export const isOAuth2ImplicitFlow = (maybeFlow: IOauth2Flow): maybeFlow is IOauth2ImplicitFlow =>
  isObject(maybeFlow) && 'authorizationUrl' in maybeFlow && !('tokenUrl' in maybeFlow);

export const isOauth2AuthorizationCodeFlow = (maybeFlow: IOauth2Flow): maybeFlow is IOauth2AuthorizationCodeFlow =>
  isObject(maybeFlow) && 'authorizationUrl' in maybeFlow && 'tokenUrl' in maybeFlow;

export const isOauth2ClientCredentialsOrPasswordFlow = (
  maybeFlow: IOauth2Flow,
): maybeFlow is IOauth2ClientCredentialsFlow | IOauth2PasswordFlow =>
  isObject(maybeFlow) && !('authorizationUrl' in maybeFlow) && 'tokenUrl' in maybeFlow;
