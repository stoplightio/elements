import { Flex, Input, Panel, Text } from '@stoplight/mosaic';
import * as React from 'react';

interface BasicAuthProps {
  onChange: (value: string) => void;
  value: string;
}

export const BasicAuth: React.FC<BasicAuthProps> = ({ onChange, value }) => {
  const [username = '', password = ''] = decode(value).split(':');

  const onCredentialsChange = React.useCallback(
    (username: string, password: string) => {
      onChange(encode(`${username}:${password}`));
    },
    [onChange],
  );

  return (
    <Panel.Content className="sl-overflow-y-auto OperationParametersContent">
      <Input role="username" appearance="minimal" readOnly value="Username" />
      <Text mx={3}>:</Text>
      <Flex flexGrow>
        <Input
          style={{ paddingLeft: 15 }}
          aria-label="Username"
          appearance="minimal"
          flexGrow
          placeholder="username"
          value={username}
          type="text"
          required
          onChange={e => onCredentialsChange(e.currentTarget.value, password)}
        />
      </Flex>
      <Input role="password" appearance="minimal" readOnly value="Password" />
      <Text mx={3}>:</Text>
      <Flex flexGrow>
        <Input
          style={{ paddingLeft: 15 }}
          aria-label="Password"
          appearance="minimal"
          flexGrow
          placeholder="password"
          value={password}
          type="password"
          required
          onChange={e => onCredentialsChange(username, e.currentTarget.value)}
        />
      </Flex>
    </Panel.Content>
  );
};

function encode(value: string) {
  return btoa(value);
}

function decode(encoded: string) {
  try {
    return atob(encoded);
  } catch {
    return '';
  }
}
