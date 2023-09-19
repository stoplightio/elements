import { Button, Menu, MenuItems, Panel } from '@stoplight/mosaic';
import { HttpSecurityScheme } from '@stoplight/types';
import * as React from 'react';

import { getReadableSecurityName, getReadableSecurityNames } from '../../../utils/oas/security';
import { APIKeyAuth } from './APIKeyAuth';
import { usePersistedSecuritySchemeWithValues } from './authentication-utils';
import { BasicAuth } from './BasicAuth';
import { BearerAuth } from './BearerAuth';
import { DigestAuth } from './DigestAuth';
import { OAuth2Auth } from './OAuth2Auth';

interface TryItAuthProps {
  operationSecuritySchemes: HttpSecurityScheme[][];
}

export const TryItAuth: React.FC<TryItAuthProps> = ({ operationSecuritySchemes }) => {
  const [operationAuthValue, setOperationAuthValue, setCurrentScheme] = usePersistedSecuritySchemeWithValues();

  const filteredSecurityItems = operationSecuritySchemes.filter(auth =>
    auth.every(scheme => securitySchemeKeys.includes(scheme.type)),
  );

  const menuName = operationAuthValue
    ? getReadableSecurityNames(operationAuthValue.map(auth => auth.scheme))
    : 'Security Scheme';

  const handleChange = (scheme: HttpSecurityScheme, authValue?: string) => {
    setOperationAuthValue({ scheme, authValue });
  };

  const menuItems = React.useMemo(() => {
    const items: MenuItems = [
      {
        type: 'group',
        title: 'Security Schemes',
        children: filteredSecurityItems.map(auth => ({
          id: `security-scheme-${getReadableSecurityNames(auth)}}`,
          title: getReadableSecurityNames(auth),
          isChecked: getReadableSecurityNames(auth) === menuName,
          onPress: () =>
            setCurrentScheme(
              auth.map(scheme => {
                return { scheme, authValue: undefined };
              }),
            ),
        })),
      },
    ];

    return items;
  }, [filteredSecurityItems, menuName, setCurrentScheme]);

  if (filteredSecurityItems.length === 0) return null;

  return (
    <Panel defaultIsOpen>
      <Panel.Titlebar
        rightComponent={
          filteredSecurityItems.length > 1 && (
            <Menu
              aria-label="security-schemes"
              items={menuItems}
              closeOnPress
              renderTrigger={({ isOpen }) => (
                <Button appearance="minimal" size="sm" iconRight={['fas', 'sort']} active={isOpen}>
                  {menuName}
                </Button>
              )}
            />
          )
        }
      >
        Auth
      </Panel.Titlebar>
      {operationAuthValue?.map(scheme => (
        <SecuritySchemeComponent
          key={scheme.scheme.key}
          scheme={scheme.scheme}
          onChange={(authValue?: string) => handleChange(scheme.scheme, authValue)}
          value={scheme.authValue ?? ''}
        />
      ))}
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
        case 'digest':
          return <DigestAuth {...rest} />;
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
