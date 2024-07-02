import {
  HttpSecurityScheme,
  IApiKeySecurityScheme,
  IBasicSecurityScheme,
  IBearerSecurityScheme,
  IOauth2Flow,
  IOauth2SecurityScheme,
  IOauthFlowObjects,
} from '@stoplight/types';
import { entries, keys } from 'lodash';

import {
  isOauth2AuthorizationCodeFlow,
  isOauth2ClientCredentialsOrPasswordFlow,
  isOAuth2ImplicitFlow,
} from './oas/security';

const oauthFlowNames: Record<keyof IOauthFlowObjects, string> = {
  implicit: 'Implicit',
  authorizationCode: 'Authorization Code',
  clientCredentials: 'Client Credentials',
  password: 'Password',
};

export function getDefaultDescription(scheme: HttpSecurityScheme) {
  switch (scheme.type) {
    case 'apiKey':
      return getApiKeyDescription(scheme);
    case 'http':
      switch (scheme.scheme) {
        case 'basic':
          return getBasicAuthDescription(scheme);
        case 'bearer':
          return getBearerAuthDescription(scheme);
        case 'digest':
          return getDigestAuthDescription(scheme);
      }
    case 'oauth2':
      return getOAuthDescription(scheme);
  }

  return '';
}

export function getOptionalAuthDescription() {
  return `Providing Auth is optional; requests may be made without an included Authorization header.`;
}

function getApiKeyDescription(scheme: IApiKeySecurityScheme) {
  const { in: inProperty, name } = scheme;
  return `An API key is a token that you provide when making API calls. Include the token in a ${inProperty} parameter called \`${name}\`.

  Example: ${inProperty === 'query' ? `\`?${name}=123\`` : `\`${name}: 123\``}${getSecuritySchemeRoles(scheme)}`;
}

function getBasicAuthDescription(schema: IBasicSecurityScheme) {
  return `Basic authentication is a simple authentication scheme built into the HTTP protocol.
  To use it, send your HTTP requests with an Authorization header that contains the word Basic
  followed by a space and a base64-encoded string \`username:password\`.

  Example: \`Authorization: Basic ZGVtbzpwQDU1dzByZA==\`${getSecuritySchemeRoles(schema)}`;
}

function getBearerAuthDescription(schema: IBearerSecurityScheme) {
  return `Provide your bearer token in the Authorization header when making requests to protected resources.

  Example: \`Authorization: Bearer 123\`${getSecuritySchemeRoles(schema)}`;
}

function getDigestAuthDescription(schema: IBasicSecurityScheme) {
  return `Provide your encrypted digest scheme data in the Authorization header when making requests to protected resources.

  Example: \`Authorization: Digest username=guest, realm="test", nonce="2", uri="/uri", response="123"\`${getSecuritySchemeRoles(
    schema,
  )}`;
}

function getOAuthDescription(scheme: IOauth2SecurityScheme) {
  const flows = keys(scheme.flows);
  return flows
    .map(flow =>
      getOAuthFlowDescription(
        oauthFlowNames[flow as keyof typeof oauthFlowNames],
        scheme.flows[flow as keyof IOauthFlowObjects]!,
      ),
    )
    .join('\n\n');
}

function getOAuthFlowDescription(title: string, flow: IOauth2Flow) {
  let description = `**${title} OAuth Flow**`;

  description +=
    isOAuth2ImplicitFlow(flow) || isOauth2AuthorizationCodeFlow(flow)
      ? `\n\nAuthorize URL: ${flow.authorizationUrl}`
      : '';

  description +=
    isOauth2AuthorizationCodeFlow(flow) || isOauth2ClientCredentialsOrPasswordFlow(flow)
      ? `\n\nToken URL: ${flow.tokenUrl}`
      : '';

  description += flow.refreshUrl ? `\n\nRefresh URL: ${flow.refreshUrl}` : '';

  const scopes = entries(flow.scopes);
  if (scopes.length) {
    description += `\n\nScopes:
${scopes.map(([key, value]) => `- \`${key}\` - ${value}`).join('\n')}`;
  }

  return description;
}

function getSecuritySchemeRoles(scheme: HttpSecurityScheme) {
  const scopes = scheme.extensions?.['x-scopes'];
  return Array.isArray(scopes) ? `\n\nRoles: ${scopes.map(scope => `\`${scope}\``).join(', ')}` : '';
}
