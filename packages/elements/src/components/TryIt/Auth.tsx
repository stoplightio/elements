import { Button, Menu, MenuItem, Panel } from '@stoplight/mosaic';
import { HttpSecurityScheme } from '@stoplight/types';
import { flatten } from 'lodash';
import * as React from 'react';

import { getReadableSecurityName } from '../../utils/oas/security';
import { APIKeyAuth } from './APIKeyAuth';
import { HttpSecuritySchemeWithValues } from './authentication-utils';
import { BasicAuth } from './BasicAuth';
import { BearerAuth } from './BearerAuth';
import { OAuth2Auth } from './OAuth2Auth';

interface TryItAuthProps {
  operationSecurityScheme: HttpSecurityScheme[][];
  onChange: (authObject: HttpSecuritySchemeWithValues | undefined) => void;
  value: HttpSecuritySchemeWithValues | undefined;
}

export const TryItAuth: React.FC<TryItAuthProps> = ({ operationSecurityScheme: operationAuth, onChange, value }) => {
  const operationSecurityArray = flatten(operationAuth);
  const filteredSecurityItems = operationSecurityArray.filter(scheme => securitySchemeKeys.includes(scheme?.type));

  const securityScheme = value ? value.scheme : filteredSecurityItems[0];

  const menuName = securityScheme ? getReadableSecurityName(securityScheme) : 'Security Scheme';

  const handleChange = (authValue?: string) => {
    onChange(securityScheme && { scheme: securityScheme, authValue: authValue });
  };

  React.useEffect(() => {
    handleChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                  text={getReadableSecurityName(auth)}
                  onClick={() => {
                    onChange({ scheme: auth, authValue: undefined });
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
          value={(value && value.authValue) ?? ''}
        />
      }
    </Panel>
  );
};

const GenericMessageContainer: React.FC<{ scheme: HttpSecurityScheme }> = ({ scheme }) => {
  return <Panel.Content>Coming Soon: {getReadableSecurityName(scheme)}</Panel.Content>;
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
    case 'http':
      switch (scheme.scheme) {
        case 'basic':
          return <BasicAuth {...rest} />;
        case 'bearer':
          return <BearerAuth scheme={scheme} {...rest} />;
        default:
          return <GenericMessageContainer scheme={scheme} {...rest} />;
      }
    default:
      return <GenericMessageContainer scheme={scheme} {...rest} />;
  }
};

const securitySchemeKeys: Array<HttpSecurityScheme['type']> = ['apiKey', 'http', 'oauth2', 'openIdConnect'];
