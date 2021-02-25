import { Button, Menu, MenuItem, Panel } from '@stoplight/mosaic';
import { HttpSecurityScheme } from '@stoplight/types';
import { flatten, head } from 'lodash';
import * as React from 'react';

import { APIKeyAuth } from './APIKeyAuth';
import { HttpSecuritySchemeWithValues } from './authentication-utils';

interface TryItAuthProps {
  operationSecurityScheme: HttpSecurityScheme[][];
  handleChange: (authObject: HttpSecuritySchemeWithValues) => void;
}

export const TryItAuth: React.FC<TryItAuthProps> = ({ operationSecurityScheme: operationAuth, handleChange }) => {
  const operationSecurityArray = flatten(operationAuth);
  const filteredSecurityItems = operationSecurityArray.filter(scheme =>
    Object.keys(securityReadableNames).includes(scheme?.type),
  );

  const [securityScheme, setSecurityScheme] = React.useState<HttpSecurityScheme | undefined>(
    head(filteredSecurityItems),
  );
  const menuName = securityScheme ? securityReadableNames[securityScheme?.type] : 'Security Scheme';

  const SchemeComponent = securityScheme && securitySchemeToComponent[securityScheme.type];

  if (filteredSecurityItems.length === 0) return null;

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
                    setSecurityScheme(auth);
                  }}
                />
              ))}
            </Menu>
          )
        }
      >
        Auth
      </Panel.Titlebar>
      {SchemeComponent && securityScheme && <SchemeComponent scheme={securityScheme} onChange={handleChange} />}
    </Panel>
  );
};

const GenericMessageContainer: React.FC<{ scheme: HttpSecurityScheme }> = ({ scheme }) => {
  return <Panel.Content>Coming Soon: {securityReadableNames[scheme.type]}</Panel.Content>;
};

const securitySchemeToComponent: Record<
  string,
  React.FC<{ scheme: HttpSecurityScheme; onChange: (AuthObject: any) => void }> | undefined
> = {
  apiKey: APIKeyAuth,
  http: GenericMessageContainer,
  oauth2: GenericMessageContainer,
  openIdConnect: GenericMessageContainer,
};

const securityReadableNames = {
  apiKey: 'API Key',
  http: 'HTTP',
  oauth2: 'OAuth 2.0',
  openIdConnect: 'OpenID Connect',
};
