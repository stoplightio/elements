import { Flex, Input, Select, SelectProps, Text } from '@stoplight/mosaic';
import * as React from 'react';

import { useUniqueId } from '../../../hooks/useUniqueId';
import { ServerVariable } from '../../../utils/http-spec/IServer';

interface VariableProps {
  variable: ServerVariable;
  value?: string;
  onChange: SelectProps['onChange'];
  validate?: boolean;
}

export const VariableEditor: React.FC<VariableProps> = ({ variable, value, onChange, validate }) => {
  const inputId = useUniqueId(`id_${variable.name}_`);

  const requiredButEmpty = validate && !value;

  return (
    <>
      <Text as="label" aria-hidden="true" data-testid="param-label" htmlFor={inputId} fontSize="base">
        {variable.name}
      </Text>
      <Text mx={3}>:</Text>
      <div>
        {variable.enum ? (
          <Select
            flex={1}
            aria-label={variable.name}
            options={variable.enum.map(s => ({ value: s }))}
            value={value || ''}
            onChange={onChange}
          />
        ) : (
          <Flex flex={1}>
            <Input
              id={inputId}
              aria-label={variable.name}
              appearance={requiredButEmpty ? 'default' : 'minimal'}
              flex={1}
              placeholder={variable.default}
              type="text"
              required
              intent={requiredButEmpty ? 'danger' : 'default'}
              value={value || ''}
              onChange={e => onChange && onChange(e.currentTarget.value)}
            />
          </Flex>
        )}
      </div>
    </>
  );
};
