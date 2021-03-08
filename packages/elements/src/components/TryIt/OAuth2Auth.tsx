import { Flex, Input, Panel, Text } from '@stoplight/mosaic';
import { IOauth2SecurityScheme } from '@stoplight/types';
import * as React from 'react';

interface OAuth2AuthProps {
  scheme: IOauth2SecurityScheme;
  onChange: (apiKey: string) => void;
  value: string;
}

export const OAuth2Auth: React.FC<OAuth2AuthProps> = ({ scheme, onChange, value }) => {
  return (
    <Panel.Content className="sl-overflow-y-auto OperationParametersContent">
      <Input role={scheme.type} appearance="minimal" readOnly value="Token" />
      <Text mx={3}>:</Text>
      <Flex flexGrow>
        <Input
          style={{ paddingLeft: 15 }}
          aria-label="Authentication Header"
          appearance="minimal"
          flexGrow
          placeholder="123"
          value={value}
          type="text"
          required
          onChange={e => onChange(e.currentTarget.value)}
        />
      </Flex>
    </Panel.Content>
  );
};
