import { Button, Menu, MenuItem, Panel } from '@stoplight/mosaic';
import { HttpSecurityScheme } from '@stoplight/types';
import * as React from 'react';

interface TryItAuthProps {
  operationAuth: HttpSecurityScheme[][];
}

export const TryItAuth: React.FC<TryItAuthProps> = ({ operationAuth }) => {
  const securityTypeComponent = (scheme: HttpSecurityScheme) => {
    switch (scheme.type) {
      case 'apiKey':
        // this is a placeholder for a future component
        return genericMessage(scheme.type);
      default:
        return genericMessage(scheme.type);
    }
  };
  const [securityScheme, setSecurityScheme] = React.useState<HttpSecurityScheme>(operationAuth[0][0]);
  const [menuName, setMenuName] = React.useState<string>(securityReadableNames[operationAuth[0][0].type]);

  return (
    <Panel defaultIsOpen>
      <Panel.Titlebar
        rightComponent={
          operationAuth.length > 1 && (
            <Menu
              label="security-schemes"
              trigger={
                <Button appearance="minimal" iconRight="caret-down">
                  {menuName}
                </Button>
              }
            >
              {operationAuth.map(auth => (
                <MenuItem
                  key={auth[0].key}
                  text={securityReadableNames[auth[0].type]}
                  onClick={() => {
                    setSecurityScheme(auth[0]);
                    setMenuName(securityReadableNames[auth[0].type]);
                  }}
                />
              ))}
            </Menu>
          )
        }
      >
        Auth
      </Panel.Titlebar>
      {securityTypeComponent(securityScheme)}
    </Panel>
  );
};

const genericMessage: React.FC<'apiKey' | 'http' | 'oauth2' | 'openIdConnect'> = (
  securityType: 'apiKey' | 'http' | 'oauth2' | 'openIdConnect',
) => {
  return <Panel.Content>Coming Soon: {securityReadableNames[securityType]}</Panel.Content>;
};

const securityReadableNames = {
  apiKey: 'API Key',
  http: 'HTTP',
  oauth2: 'OAuth 2.0',
  openIdConnect: 'OpenID Connect',
};
