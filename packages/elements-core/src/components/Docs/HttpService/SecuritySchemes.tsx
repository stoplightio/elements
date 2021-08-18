import { Panel } from '@stoplight/mosaic';
import { HttpSecurityScheme, IOauth2Flow, IOauth2SecurityScheme, IOauthFlowObjects } from '@stoplight/types';
import { entries, keys, sortBy } from 'lodash';
import React from 'react';

import {
  getReadableSecurityName,
  isOauth2AuthorizationCodeFlow,
  isOauth2ClientCredentialsOrPasswordFlow,
  isOAuth2ImplicitFlow,
  shouldIncludeKey,
} from '../../../utils/oas/security';
import { MarkdownViewer } from '../../MarkdownViewer';

interface SecuritySchemesProps {
  schemes: HttpSecurityScheme[];
  defaultScheme?: string;
}

const oauthFlowNames: Record<keyof IOauthFlowObjects, string> = {
  implicit: 'Implicit',
  authorizationCode: 'Authorization Code',
  clientCredentials: 'Client Credentials',
  password: 'Password',
};

export const SecuritySchemes: React.FC<SecuritySchemesProps> = ({ schemes, defaultScheme }) => {
  return (
    <Panel rounded isCollapsible={false}>
      <Panel.Titlebar bg="canvas-300">
        <span role="heading">Security</span>
      </Panel.Titlebar>
      <Panel.Content p={0}>
        {sortBy(schemes, 'type').map((scheme, i) => (
          <Panel
            key={i}
            defaultIsOpen={defaultScheme ? scheme.key === defaultScheme : i === 0}
            isCollapsible={schemes.length > 1}
          >
            <Panel.Titlebar>
              <span role="heading">{getReadableSecurityName(scheme, shouldIncludeKey(schemes, scheme.type))}</span>
            </Panel.Titlebar>
            <Panel.Content>
              <MarkdownViewer
                style={{ fontSize: 12 }}
                markdown={`${scheme.description || ''}\n\n` + getDefaultDescription(scheme)}
              />
            </Panel.Content>
          </Panel>
        ))}
      </Panel.Content>
    </Panel>
  );
};

function getDefaultDescription(scheme: HttpSecurityScheme) {
  switch (scheme.type) {
    case 'apiKey':
      return getApiKeyDescription(scheme.in, scheme.name);
    case 'http':
      switch (scheme.scheme) {
        case 'basic':
          return getBasicAuthDescription();
        case 'bearer':
          return getBearerAuthDescription();
        case 'digest':
          return getDigestAuthDescription();
      }
    case 'oauth2':
      return getOAuthDescription(scheme);
  }

  return '';
}

function getApiKeyDescription(inProperty: 'header' | 'cookie' | 'query', name: string) {
  return `An API key is a token that you provide when making API calls. Include the token in a ${inProperty} parameter called \`${name}\`.

  Example: ${inProperty === 'query' ? `\`?${name}=123\`` : `\`${name}: 123\``}`;
}

function getBasicAuthDescription() {
  return `Basic authentication is a simple authentication scheme built into the HTTP protocol.
  To use it, send your HTTP requests with an Authorization header that contains the word Basic
  followed by a space and a base64-encoded string \`username:password\`.

  Example: \`Authorization: Basic ZGVtbzpwQDU1dzByZA==\``;
}

function getBearerAuthDescription() {
  return `Provide your bearer token in the Authorization header when making requests to protected resources.

  Example: \`Authorization: Bearer 123\``;
}

function getDigestAuthDescription() {
  return `Provide your encrypted digest scheme data in the Authorization header when making requests to protected resources.

  Example: \`Authorization: Digest username=guest, realm="test", nonce="2", uri="/uri", response="123"\``;
}

function getOAuthDescription(scheme: IOauth2SecurityScheme) {
  const flows = keys(scheme.flows);
  return flows.map(flow => getOAuthFlowDescription(oauthFlowNames[flow], scheme.flows[flow])).join('\n\n');
}

export function getOAuthFlowDescription(title: string, flow: IOauth2Flow) {
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

  description += `\n\nScopes:
${entries(flow.scopes)
  .map(([key, value]) => `- \`${key}\` - ${value}`)
  .join('\n')}`;

  return description;
}
