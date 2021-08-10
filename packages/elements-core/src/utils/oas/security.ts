import {
  HttpSecurityScheme,
  IOauth2AuthorizationCodeFlow,
  IOauth2ClientCredentialsFlow,
  IOauth2Flow,
  IOauth2ImplicitFlow,
  IOauth2PasswordFlow,
} from '@stoplight/types';
import { capitalize, filter, isObject } from 'lodash';

export function getReadableSecurityName(securityScheme: HttpSecurityScheme, includeKey: boolean = false) {
  let name = '';
  switch (securityScheme.type) {
    case 'apiKey':
      name = 'API Key';
      break;
    case 'http':
      name = `${capitalize(securityScheme.scheme)} Auth`;
      break;
    case 'oauth2':
      name = 'OAuth 2.0';
      break;
    case 'openIdConnect':
      name = 'OpenID Connect';
      break;
    case 'mutualTLS':
      name = 'Mutual TLS';
      break;
  }

  return includeKey ? `${name} (${securityScheme.key})` : name;
}

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

export function shouldIncludeKey(schemes: HttpSecurityScheme[], type: HttpSecurityScheme['type']) {
  return filter(schemes, { type }).length > 1;
}
