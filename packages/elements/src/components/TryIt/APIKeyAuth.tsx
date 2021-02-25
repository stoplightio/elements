import { Flex, Input, Panel, Text } from '@stoplight/mosaic';
import { HttpSecurityScheme } from '@stoplight/types';
import * as React from 'react';

import { HttpSecuritySchemeWithValues, isIApiKeySecurityScheme } from './authentication-utils';

interface APIKeyAuthPros {
  scheme: HttpSecurityScheme;
  onChange: (apiKey: HttpSecuritySchemeWithValues) => void;
}

export const APIKeyAuth: React.FC<APIKeyAuthPros> = ({ scheme, onChange }) => {
  const ApiKeyScheme = isIApiKeySecurityScheme(scheme) && scheme;

  if (!ApiKeyScheme) return null;

  return (
    <Panel.Content>
      <Flex align="center" key={ApiKeyScheme.name}>
        <Input appearance="minimal" readOnly value={ApiKeyScheme.name} />
        <Text mx={3}>:</Text>
        <Flex flexGrow>
          <Input
            style={{ paddingLeft: 15 }}
            aria-label={ApiKeyScheme.name}
            appearance="minimal"
            flexGrow
            placeholder="123"
            type="text"
            required
            onChange={e => onChange({ ...ApiKeyScheme, value: e.target.value })}
          />
        </Flex>
      </Flex>
    </Panel.Content>
  );
};
