import { Button, Menu, MenuItem, Panel } from '@stoplight/mosaic';
import { HttpSecurityScheme } from '@stoplight/types';
import { flatten } from 'lodash';
import * as React from 'react';

import { APIKeyAuth } from './APIKeyAuth';
import { HttpSecuritySchemeWithValues } from './authentication-utils';
import { OAuth2Auth } from './OAuth2Auth';

interface TryItAuthProps {
  operationSecurityScheme: HttpSecurityScheme[][];
  onChange: (authObject: HttpSecuritySchemeWithValues | undefined) => void;
  value: HttpSecuritySchemeWithValues | undefined;
}

export const TryItAuth: React.FC<TryItAuthProps> = ({ operationSecurityScheme: operationAuth, onChange, value }) => {
  const operationSecurityArray = flatten(operationAuth);
  const filteredSecurityItems = operationSecurityArray.filter(scheme =>
    Object.keys(securityReadableNames).includes(scheme?.type),
  );

  const securityScheme = value ? value.scheme : filteredSecurityItems[0];

  const menuName = securityScheme ? securityReadableNames[securityScheme?.type] : 'Security Scheme';

  if (filteredSecurityItems.length === 0) return null;

  const handleChange = (authValue: string) => {
    onChange(securityScheme && { scheme: securityScheme, authValue: authValue });
  };

  return (
    <Panel defaultIsOpen>
      <Panel.Titlebar
        rightComponent={
          filteredSecurityItems.length > 1 && (
            <Menu
              label="security-schemes"
              trigger={
                <Button appearance="minimal" iconRight="caret-down">
                  {menuName}
                </Button>
              }
            >
              {filteredSecurityItems.map(auth => (
                <MenuItem
                  key={auth.key}
                  text={securityReadableNames[auth.type]}
                  onClick={() => {
                    onChange({ scheme: auth, authValue: '' });
                  }}
                />
              ))}
            </Menu>
          )
        }
      >
        Auth
      </Panel.Titlebar>
      {
        <SecuritySchemeComponent
          scheme={value ? value.scheme : filteredSecurityItems[0]}
          onChange={handleChange}
          value={value ? value.authValue : ''}
        />
      }
    </Panel>
  );
};

const GenericMessageContainer: React.FC<{ scheme: HttpSecurityScheme }> = ({ scheme }) => {
  return <Panel.Content>Coming Soon: {securityReadableNames[scheme.type]}</Panel.Content>;
};

interface SecuritySchemeComponentProps {
  scheme: HttpSecurityScheme;
  onChange: (AuthObject: any) => void;
  value: string;
}

const SecuritySchemeComponent: React.FC<SecuritySchemeComponentProps> = ({ scheme, ...rest }) => {
  switch (scheme.type) {
    case 'apiKey':
      return <APIKeyAuth scheme={scheme} {...rest} />;
    case 'oauth2':
      return <OAuth2Auth scheme={scheme} {...rest} />;
    default:
      return <GenericMessageContainer scheme={scheme} {...rest} />;
  }
};

const securityReadableNames = {
  apiKey: 'API Key',
  http: 'HTTP',
  oauth2: 'OAuth 2.0',
  openIdConnect: 'OpenID Connect',
};
