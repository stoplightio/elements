import { Flex, Input, Select, SelectProps, Text } from '@stoplight/mosaic';
import * as React from 'react';

import { useUniqueId } from '../../../hooks/useUniqueId';
import { ServerVariable } from '../../../utils/http-spec/IServer';

/**
 * Encodes a value to be safe for use in CSS selectors (data-key attributes).
 * Special characters like quotes, brackets, etc. can break querySelector.
 */
function encodeSafeSelectorValue(value: string): string {
  // Check if the value contains characters that would break CSS selectors
  const hasSpecialChars = /["'\[\]\\(){}]/.test(value);
  if (!hasSpecialChars) {
    return value;
  }

  // Encode to base64 to make it safe for CSS selectors
  try {
    return 'b64:' + btoa(value);
  } catch (e) {
    // If btoa fails (e.g., with unicode), fallback to encodeURIComponent
    return 'enc:' + encodeURIComponent(value);
  }
}

/**
 * Decodes a value that was encoded by encodeSafeSelectorValue
 */
function decodeSafeSelectorValue(value: string): string {
  if (value.startsWith('b64:')) {
    try {
      return atob(value.substring(4));
    } catch (e) {
      return value;
    }
  }

  if (value.startsWith('enc:')) {
    try {
      return decodeURIComponent(value.substring(4));
    } catch (e) {
      return value;
    }
  }

  return value;
}

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
