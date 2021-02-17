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

  return (
    <Panel defaultIsOpen>
      <Panel.Titlebar
        rightComponent={
          operationAuth.length > 1 && (
            <Menu
              label="security-schemes"
              trigger={
                <Button appearance="minimal" iconRight="caret-down">
                  Security Schemes
                </Button>
              }
            >
              {operationAuth.map(auth => (
                <MenuItem key={auth[0].key} text={auth[0].key} onClick={() => setSecurityScheme(auth[0])} />
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
  return <Panel.Content>Coming Soon: {securityType}</Panel.Content>;
};
