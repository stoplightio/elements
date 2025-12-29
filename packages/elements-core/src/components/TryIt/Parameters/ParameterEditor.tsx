import { Flex, Input, Select, SelectProps, Text } from '@stoplight/mosaic';
import * as React from 'react';

import { useUniqueId } from '../../../hooks/useUniqueId';
import {
  decodeSafeSelectorValue,
  exampleOptions,
  getPlaceholderForParameter,
  getPlaceholderForSelectedParameter,
  parameterOptions,
  ParameterSpec,
  selectExampleOption,
} from './parameter-utils';

interface ParameterProps {
  parameter: ParameterSpec;
  value?: string;
  onChange: SelectProps['onChange'];
  isOptional: boolean;
  onChangeOptional: (optional: boolean) => void;
  canChangeOptional: boolean;
  validate?: boolean;
}

export const ParameterEditor: React.FC<ParameterProps> = ({
  parameter,
  value,
  onChange,
  isOptional,
  onChangeOptional,
  canChangeOptional,
  validate,
}) => {
  const inputId = useUniqueId(`id_${parameter.name}_`);
  const inputCheckId = useUniqueId(`id_${parameter.name}_checked`);
  const parameterValueOptions = parameterOptions(parameter);
  const examples = exampleOptions(parameter);
  const selectedExample = examples?.find(e => e.value === value) ?? selectExampleOption;
  const parameterDisplayName = `${parameter.name}${parameter.required ? '*' : ''}`;
  console.log("Inside Parameter Editor in APLHA BRANCH");
  // Find the encoded value that matches the current (decoded) value
  const encodedValue = React.useMemo(() => {
    if (!value || !parameterValueOptions) return value || '';
    const matchingOption = parameterValueOptions.find(opt => {
      return String(decodeSafeSelectorValue(opt.value as string | number)) === value;
    });
    return matchingOption ? String(matchingOption.value) : value;
  }, [value, parameterValueOptions]);

  const requiredButEmpty = validate && parameter.required && !value;

  return (
    <>
      <Text as="label" aria-hidden="true" data-testid="param-label" htmlFor={inputId} fontSize="base">
        {parameterDisplayName}
      </Text>
      <Text mx={3}>:</Text>
      <div>
        {parameterValueOptions ? (
          <Select
            flex={1}
            aria-label={parameter.name}
            options={parameterValueOptions}
            value={encodedValue}
            onChange={val => onChange && onChange(String(decodeSafeSelectorValue(val as string | number)))}
            placeholder={getPlaceholderForSelectedParameter(parameter)}
          />
        ) : (
          <Flex flex={1}>
            <Input
              id={inputId}
              aria-label={parameter.name}
              appearance={requiredButEmpty ? 'default' : 'minimal'}
              flex={1}
              placeholder={getPlaceholderForParameter(parameter)}
              type={parameter.schema?.type === 'number' ? 'number' : 'text'}
              required
              intent={requiredButEmpty ? 'danger' : 'default'}
              value={value || ''}
              onChange={e => onChange && onChange(e.currentTarget.value)}
            />
            {examples && (
              <Select
                aria-label={`${parameter.name}-select`}
                flex={1}
                value={selectedExample.value}
                options={examples}
                onChange={onChange}
              />
            )}
          </Flex>
        )}
      </div>
      {canChangeOptional && !parameter.required && (
        <>
          <div></div>
          <div></div>
          <div>
            <Flex flex={1}>
              <Input
                className="Checkbox"
                aria-label={`${parameter.name}-checkbox`}
                id={inputCheckId}
                flex={1}
                type="checkbox"
                intent="success"
                size="sm"
                checked={isOptional}
                onChange={e => onChangeOptional(!e.target.checked)}
              />
              <Text
                className="TextForCheckBox"
                flex={1}
                as="label"
                aria-hidden="true"
                data-testid="param-check"
                htmlFor={inputCheckId}
                fontSize="base"
              >
                Omit {parameterDisplayName}
              </Text>
            </Flex>
          </div>
        </>
      )}
    </>
  );
};
