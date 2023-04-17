import { Flex, Input, Text } from '@stoplight/mosaic';
import { HttpSecurityScheme } from '@stoplight/types';
import * as React from 'react';

import { useUniqueId } from '../../../hooks/useUniqueId';

interface AuthTokenInputProps {
  onChange: (value: string) => void;
  type: HttpSecurityScheme['type'];
  name: string;
  value: string;
}

export const AuthTokenInput: React.FC<AuthTokenInputProps> = ({ type, name, value, onChange }) => {
  const inputId = useUniqueId(`id_auth_${name}_`);
  return (
    <>
      <label aria-hidden="true" htmlFor={inputId}>
        {name}
      </label>
      <Text mx={3}>:</Text>
      <Flex flex={1}>
        <Input
          id={inputId}
          aria-label={name}
          appearance="minimal"
          flex={1}
          placeholder={type === 'oauth2' ? 'Bearer 123' : '123'}
          value={value}
          type="text"
          required
          onChange={e => onChange(e.currentTarget.value)}
          enterKeyHint="done"
        />
      </Flex>
    </>
  );
};
