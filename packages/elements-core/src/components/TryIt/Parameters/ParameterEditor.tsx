import { Flex, Input, Select, SelectProps, Text } from '@stoplight/mosaic';
import * as React from 'react';

import { useUniqueId } from '../../../hooks/useUniqueId';
import {
  exampleOptions,
  getPlaceholderForParameter,
  parameterOptions,
  ParameterSpec,
  selectExampleOption,
} from './parameter-utils';

interface ParameterProps {
  parameter: ParameterSpec;
  value?: string;
  isDisabled?: boolean;
  onChangeValue: SelectProps['onChange'];
  onChangeDisabled?: () => void;
  validate?: boolean;
}

export const ParameterEditor: React.FC<ParameterProps> = ({
  parameter,
  value,
  onChangeValue,
  onChangeDisabled,
  isDisabled,
  validate,
}) => {
  const inputId = useUniqueId(`id_${parameter.name}_`);
  const parameterValueOptions = parameterOptions(parameter);
  const examples = exampleOptions(parameter);
  const selectedExample = examples?.find(e => e.value === value) ?? selectExampleOption;
  const parameterDisplayName = `${parameter.name}${parameter.required ? '*' : ''}`;

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
            value={value || ''}
            onChange={onChangeValue}
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
              onChange={e => onChangeValue && onChangeValue(e.currentTarget.value)}
            />
            {examples && (
              <Select
                aria-label={`${parameter.name}-select`}
                flex={1}
                value={selectedExample.value}
                options={examples}
                onChange={onChangeValue}
              />
            )}
            {isDisabled !== undefined && (
              <Input type="checkbox" checked={!isDisabled} w={3} onChange={onChangeDisabled} />
            )}
          </Flex>
        )}
      </div>
    </>
  );
};
