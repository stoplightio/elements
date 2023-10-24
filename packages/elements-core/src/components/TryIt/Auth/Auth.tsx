import { Button, Menu, MenuItems, Panel } from '@stoplight/mosaic';
import { HttpSecurityScheme } from '@stoplight/types';
import * as React from 'react';

import { getReadableSecurityName, getReadableSecurityNames, shouldAddKey } from '../../../utils/oas/security';
import { APIKeyAuth } from './APIKeyAuth';
import { createUndefinedValuedSchemes, HttpSecuritySchemeWithValues } from './authentication-utils';
import { BasicAuth } from './BasicAuth';
import { BearerAuth } from './BearerAuth';
import { DigestAuth } from './DigestAuth';
import { OAuth2Auth } from './OAuth2Auth';

interface TryItAuthProps {
  operationSecuritySchemes: HttpSecurityScheme[][];
  operationAuthValue: HttpSecuritySchemeWithValues[] | undefined;
  setOperationAuthValue: React.Dispatch<HttpSecuritySchemeWithValues | undefined>;
  setCurrentScheme: React.Dispatch<HttpSecuritySchemeWithValues[] | undefined>;
}

const checkViableCurrentAuth = (
  current: HttpSecuritySchemeWithValues[] | undefined,
  operationSecuritySchemes: HttpSecurityScheme[][],
) => {
  if (current === undefined) return false;

  const flattened = operationSecuritySchemes.flat(1);
  for (const element of current) {
    if (!flattened.some(flat => flat.id === element.scheme.id)) return false;
  }

  return true;
};

const createMenuChild = (name: string, currentItemName: string | undefined, onPress: () => void) => {
  return {
    id: `security-scheme-${name}`,
    title: name,
    isChecked: name === currentItemName,
    onPress,
  };
};

export const TryItAuth: React.FC<TryItAuthProps> = ({
  operationSecuritySchemes,
  operationAuthValue,
  setOperationAuthValue,
  setCurrentScheme,
}) => {
  const filteredSecurityItems = operationSecuritySchemes.filter(
    auth => auth.length === 0 || auth.every(scheme => securitySchemeKeys.includes(scheme.type)),
  );

  const menuName = operationAuthValue
    ? getReadableSecurityNames(operationAuthValue.map(auth => auth.scheme))
    : 'Security Scheme';

  const currentName = operationAuthValue
    ? getReadableSecurityNames(
        operationAuthValue.map(auth => auth.scheme),
        shouldAddKey(
          operationAuthValue.map(auth => auth.scheme),
          operationSecuritySchemes,
        ),
      )
    : undefined;

  const handleChange = (scheme: HttpSecurityScheme, authValue?: string) => {
    setOperationAuthValue({ scheme, authValue });
  };

  React.useEffect(() => {
    if (checkViableCurrentAuth(operationAuthValue, operationSecuritySchemes) === false) {
      setCurrentScheme(createUndefinedValuedSchemes(operationSecuritySchemes[0]));
    }
  });

  const menuItems = React.useMemo(() => {
    const items: MenuItems = [
      {
        type: 'group',
        title: 'Security Schemes',
        children: filteredSecurityItems.map(auth =>
          createMenuChild(
            getReadableSecurityNames(auth, shouldAddKey(auth, operationSecuritySchemes)),
            currentName,
            () => setCurrentScheme(createUndefinedValuedSchemes(auth)),
          ),
        ),
      },
    ];

    return items;
  }, [currentName, filteredSecurityItems, operationSecuritySchemes, setCurrentScheme]);

  if (filteredSecurityItems.length === 0) return null;

  return (
    <Panel defaultIsOpen data-test="try-it-auth">
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
      {operationAuthValue && operationAuthValue.length > 0 ? (
        operationAuthValue.map(scheme => (
          <SecuritySchemeComponent
            key={scheme.scheme.key}
            scheme={scheme.scheme}
            onChange={(authValue?: string) => handleChange(scheme.scheme, authValue)}
            value={scheme.authValue ?? ''}
          />
        ))
      ) : (
        <OptionalMessageContainer />
      )}
    </Panel>
  );
};

const GenericMessageContainer: React.FC<{ scheme: HttpSecurityScheme }> = ({ scheme }) => {
  return <Panel.Content data-test="auth-try-it-row">Coming Soon: {getReadableSecurityName(scheme)}</Panel.Content>;
};

const OptionalMessageContainer: React.FC = () => {
  return <Panel.Content>No auth selected</Panel.Content>;
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
