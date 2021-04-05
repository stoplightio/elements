import { Flex, Input, Text } from '@stoplight/mosaic';
import { HttpSecurityScheme } from '@stoplight/types';
import * as React from 'react';

interface AuthTokenInputProps {
  onChange: (value: string) => void;
  type: HttpSecurityScheme['type'];
  name: string;
  value: string;
}

export const AuthTokenInput: React.FC<AuthTokenInputProps> = ({ type, name, value, onChange }) => {
  return (
    <>
      <Input role={type} appearance="minimal" readOnly value={name} />
      <Text mx={3}>:</Text>
      <Flex flex={1}>
        <Input
          style={{ paddingLeft: 15 }}
          aria-label={name}
          appearance="minimal"
          flex={1}
          placeholder={type === 'oauth2' ? 'Bearer 123' : '123'}
          value={value}
          type="text"
          required
          onChange={e => onChange(e.currentTarget.value)}
        />
      </Flex>
    </>
  );
};
