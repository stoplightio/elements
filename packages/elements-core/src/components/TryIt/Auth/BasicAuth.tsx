import { Flex, Input, Panel, Text } from '@stoplight/mosaic';
import * as React from 'react';

interface BasicAuthProps {
  onChange: (value: string) => void;
  value: string;
}

export const BasicAuth: React.FC<BasicAuthProps> = ({ onChange, value }) => {
  const [username = '', password = ''] = decode(value).split(':');

  const onCredentialsChange = (username: string, password: string) => {
    onChange(encode(`${username}:${password}`));
  };

  return (
    <Panel.Content className="ParameterGrid" data-test="auth-try-it-row">
      <div>Username</div>
      <Text mx={3}>:</Text>
      <Flex flex={1}>
        <Input
          style={{ paddingLeft: 15 }}
          aria-label="Username"
          appearance="minimal"
          flex={1}
          placeholder="username"
          value={username}
          type="text"
          required
          onChange={e => onCredentialsChange(e.currentTarget.value, password)}
          enterKeyHint="next"
        />
      </Flex>
      <div>Password</div>
      <Text mx={3}>:</Text>
      <Flex flex={1}>
        <Input
          style={{ paddingLeft: 15 }}
          aria-label="Password"
          appearance="minimal"
          flex={1}
          placeholder="password"
          value={password}
          type="password"
          required
          onChange={e => onCredentialsChange(username, e.currentTarget.value)}
          enterKeyHint="done"
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
