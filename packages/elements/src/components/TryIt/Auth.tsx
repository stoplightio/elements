import { Button, Menu, MenuItem, Panel } from '@stoplight/mosaic';
import { HttpSecurityScheme } from '@stoplight/types';
import { flattenDeep } from 'lodash';
import * as React from 'react';

interface TryItAuthProps {
  operationAuth: HttpSecurityScheme[][];
}

export const TryItAuth: React.FC<TryItAuthProps> = ({ operationAuth }) => {
  const operationSecurityArray = flattenDeep(operationAuth);
  const filteredSecurityItems = operationSecurityArray.filter(scheme =>
    Object.keys(securityReadableNames).includes(scheme?.type),
  );

  const [securityScheme, setSecurityScheme] = React.useState<HttpSecurityScheme>(filteredSecurityItems[0]);
  const [menuName, setMenuName] = React.useState<string>(
    filteredSecurityItems.length ? securityReadableNames[filteredSecurityItems[0].type] : '',
  );

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
                    setMenuName(securityReadableNames[auth.type]);
                  }}
                />
              ))}
            </Menu>
          )
        }
      >
        Auth
      </Panel.Titlebar>
      {displaySecurityTypeComponent(securityScheme)}
    </Panel>
  );
};

const genericMessageContainer = (securityType: 'apiKey' | 'http' | 'oauth2' | 'openIdConnect') => (
  <Panel.Content>Coming Soon: {securityReadableNames[securityType]}</Panel.Content>
);

const securityReadableNames = {
  apiKey: 'API Key',
  http: 'HTTP',
  oauth2: 'OAuth 2.0',
  openIdConnect: 'OpenID Connect',
};

const displaySecurityTypeComponent = (scheme: HttpSecurityScheme) => {
  switch (scheme.type) {
    case 'apiKey':
      // this is a placeholder for a future component
      return genericMessageContainer(scheme.type);
    default:
      return genericMessageContainer(scheme.type);
  }
};
