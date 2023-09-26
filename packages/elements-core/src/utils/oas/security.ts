import { hash } from '@stoplight/http-spec/hash';
import {
  HttpSecurityScheme,
  IOauth2AuthorizationCodeFlow,
  IOauth2ClientCredentialsFlow,
  IOauth2Flow,
  IOauth2ImplicitFlow,
  IOauth2PasswordFlow,
} from '@stoplight/types';
import { capitalize, filter, flatten, isObject } from 'lodash';

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
    case undefined:
      name = 'None';
      break;
  }

  return includeKey ? `${name} (${securityScheme.key})` : name;
}

export function getReadableSecurityNames(securitySchemes: HttpSecurityScheme[], includeKey: boolean = false) {
  if (securitySchemes.length === 0) return 'None';
  let name = '';
  for (let i = 0; i < securitySchemes.length; i++) {
    if (i > 0) name += ' & ';
    name += getReadableSecurityName(securitySchemes[i], shouldIncludeKey(securitySchemes, securitySchemes[i].type));
  }

  return includeKey ? `${name} (${securitySchemes[0].key})` : name;
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

export const shouldAddKey = (auth: HttpSecurityScheme[], operationSecuritySchemes: HttpSecurityScheme[][]) => {
  if (auth.length !== 1) return false;
  return shouldIncludeKey(flatten(operationSecuritySchemes.filter(scheme => scheme.length === 1)), auth[0].type);
};

export const getSecurityGroupId = (id: string, position: number) => {
  return hash(`http_security_group-${id}-${position}`);
};
