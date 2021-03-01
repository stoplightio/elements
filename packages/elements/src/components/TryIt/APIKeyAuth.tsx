import { Flex, Input, Panel, Text } from '@stoplight/mosaic';
import { IApiKeySecurityScheme } from '@stoplight/types';
import * as React from 'react';

import { HttpSecuritySchemeWithValues } from './authentication-utils';

interface APIKeyAuthProps {
  scheme: IApiKeySecurityScheme;
  onChange: (apiKey: HttpSecuritySchemeWithValues) => void;
}

export const APIKeyAuth: React.FC<APIKeyAuthProps> = ({ scheme, onChange }) => {
  return (
    <Panel.Content className="sl-overflow-y-auto OperationParametersContent">
      <Input role={scheme.type} appearance="minimal" readOnly value={scheme.name} />
      <Text mx={3}>:</Text>
      <Flex flexGrow>
        <Input
          style={{ paddingLeft: 15 }}
          aria-label={scheme.name}
          appearance="minimal"
          flexGrow
          placeholder="123"
          type="text"
          required
          onChange={e => onChange({ ...scheme, value: e.target.value })}
        />
      </Flex>
    </Panel.Content>
  );
};
