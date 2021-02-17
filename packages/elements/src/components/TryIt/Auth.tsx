import { Button, Menu, MenuItem, Panel } from '@stoplight/mosaic';
import { HttpSecurityScheme } from '@stoplight/types';
import * as React from 'react';

interface TryItAuthProps {
  operationAuth: HttpSecurityScheme[][];
}

export const TryItAuth: React.FC<TryItAuthProps> = ({ operationAuth }) => {
  return (
    <Panel defaultIsOpen>
      <Panel.Titlebar
        rightComponent={
          operationAuth.length > 0 && (
            <Menu
              label="security-schemes"
              trigger={
                <Button appearance="minimal" iconRight="caret-down">
                  Security Schemes
                </Button>
              }
            >
              {operationAuth.map(auth => (
                <MenuItem key={auth[0].key} text={auth[0].key} />
              ))}
            </Menu>
          )
        }
      >
        Auth
      </Panel.Titlebar>
      <Panel.Content>Comming Soon</Panel.Content>
    </Panel>
  );
};
