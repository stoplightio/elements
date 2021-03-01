import { Flex, Input, Panel, Text } from '@stoplight/mosaic';
import { HttpSecurityScheme } from '@stoplight/types';
import * as React from 'react';

import { HttpSecuritySchemeWithValues, isApiKeySecurityScheme } from './authentication-utils';

interface APIKeyAuthProps {
  scheme: HttpSecurityScheme;
  onChange: (apiKey: HttpSecuritySchemeWithValues) => void;
}

export const APIKeyAuth: React.FC<APIKeyAuthProps> = ({ scheme, onChange }) => {
  const ApiKeyScheme = isApiKeySecurityScheme(scheme) && scheme;

  if (!ApiKeyScheme) return null;

  return (
    <Panel.Content className="sl-overflow-y-auto OperationParametersContent">
      <Input role={ApiKeyScheme.type} appearance="minimal" readOnly value={ApiKeyScheme.name} />
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
    </Panel.Content>
  );
};
