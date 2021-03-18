import { Panel } from '@stoplight/mosaic';
import { HttpSecurityScheme, IOauth2Flow, IOauth2SecurityScheme, IOauthFlowObjects } from '@stoplight/types';
import { entries, keys } from 'lodash';
import React from 'react';

import {
  getReadableSecurityName,
  isOauth2AuthorizationCodeFlow,
  isOauth2ClientCredentialsOrPasswordFlow,
  isOAuth2ImplicitFlow,
} from '../../../utils/oas/security';
import { MarkdownViewer } from '../../MarkdownViewer';

export interface SecuritySchemesProps {
  schemes: HttpSecurityScheme[];
}

const oauthFlowNames: Record<keyof IOauthFlowObjects, string> = {
  implicit: 'Implicit',
  authorizationCode: 'Authorization Code',
  clientCredentials: 'Client Credentials',
  password: 'Password',
};

export const SecuritySchemes: React.FC<SecuritySchemesProps> = ({ schemes }) => {
  return (
    <Panel rounded isCollapsible={false}>
      <Panel.Titlebar bg="canvas-300">
        <span role="heading">Security</span>
      </Panel.Titlebar>
      <Panel.Content p={0}>
        {schemes.map((scheme, i) => (
          <Panel key={i} defaultIsOpen={i === 0} isCollapsible={schemes.length > 1}>
            <Panel.Titlebar>
              <span role="heading">{getReadableSecurityName(scheme)}</span>
            </Panel.Titlebar>
            <Panel.Content>
              <MarkdownViewer markdown={scheme.description || getDefaultDescription(scheme)} />
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
      }
      return '';
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

function getOAuthDescription(scheme: IOauth2SecurityScheme) {
  const flows = keys(scheme.flows);
  return flows.map(flow => getOAuthFlowDescription(oauthFlowNames[flow], scheme.flows[flow])).join('\n\n');
}

function getOAuthFlowDescription(title: string, flow: IOauth2Flow) {
  return `**${title} OAuth Flow**

  ${isOAuth2ImplicitFlow(flow) || isOauth2AuthorizationCodeFlow(flow) ? `Authorize URL: ${flow.authorizationUrl}` : ''}

  ${
    isOauth2AuthorizationCodeFlow(flow) || isOauth2ClientCredentialsOrPasswordFlow(flow)
      ? `Token URL: ${flow.tokenUrl}`
      : ''
  }

  ${flow.refreshUrl ? `Refresh URL: ${flow.refreshUrl}` : ''}

  Scopes:
  ${entries(flow.scopes)
    .map(([key, value]) => `- \`${key}\` - ${value}`)
    .join('\n')}`;
}
