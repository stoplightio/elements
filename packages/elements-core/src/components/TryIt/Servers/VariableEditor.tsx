import { Flex, Input, Select, SelectProps, Text } from '@stoplight/mosaic';
import * as React from 'react';

import { useUniqueId } from '../../../hooks/useUniqueId';
import { ServerVariable } from '../../../utils/http-spec/IServer';
import { decodeSafeSelectorValue, encodeSafeSelectorValue } from '../Parameters/parameter-utils';

interface VariableProps {
  variable: ServerVariable;
  value?: string;
  onChange: SelectProps['onChange'];
  validate?: boolean;
}

export const VariableEditor: React.FC<VariableProps> = ({ variable, value, onChange }) => {
  const inputId = useUniqueId(`id_${variable.name}_`);

  // Find the encoded value that matches the current (decoded) value
  const encodedOptions = React.useMemo(
    () => (variable.enum ? variable.enum.map(s => ({ value: encodeSafeSelectorValue(s), label: String(s) })) : []),
    [variable.enum],
  );

  const encodedValue = React.useMemo(() => {
    if (!value || !variable.enum) return value || variable.default;
    const matchingOption = encodedOptions.find(opt => decodeSafeSelectorValue(String(opt.value)) === value);
    return matchingOption ? String(matchingOption.value) : value;
  }, [value, variable.enum, variable.default, encodedOptions]);

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
            options={encodedOptions}
            value={encodedValue}
            onChange={val => onChange && onChange(decodeSafeSelectorValue(String(val)))}
          />
        ) : (
          <Flex flex={1}>
            <Input
              id={inputId}
              aria-label={variable.name}
              appearance={'minimal'}
              flex={1}
              placeholder={variable.default}
              type="text"
              required
              intent={'default'}
              value={value || ''}
              onChange={e => onChange && onChange(e.currentTarget.value)}
            />
          </Flex>
        )}
      </div>
    </>
  );
};
