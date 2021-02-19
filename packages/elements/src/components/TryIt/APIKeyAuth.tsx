import { Flex, Input, Panel, Text } from '@stoplight/mosaic';
import { IApiKeySecurityScheme } from '@stoplight/types';
import * as React from 'react';

interface APIKeyProps {
  scheme: IApiKeySecurityScheme;
}

export const APIKeyAuth: React.FC<APIKeyProps> = ({ scheme }) => {
  return (
    <Panel.Content>
      <Flex align="center" key={scheme.name}>
        <Input appearance="minimal" readOnly value={scheme.name} />
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
          />
        </Flex>
      </Flex>
    </Panel.Content>
  );
};
