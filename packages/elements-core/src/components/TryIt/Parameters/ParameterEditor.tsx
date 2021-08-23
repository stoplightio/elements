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
  onChange: SelectProps['onChange'];
}

export const ParameterEditor: React.FC<ParameterProps> = ({ parameter, value, onChange }) => {
  const inputId = useUniqueId(`id_${parameter.name}_`);
  const parameterValueOptions = parameterOptions(parameter);
  const examples = exampleOptions(parameter);
  const selectedExample = examples?.find(e => e.value === value) ?? selectExampleOption;
  const parameterDisplayName = `${parameter.name}${parameter.required ? '*' : ''}`;

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
            onChange={onChange}
          />
        ) : (
          <Flex flex={1}>
            <Input
              id={inputId}
              aria-label={parameter.name}
              appearance="minimal"
              flex={1}
              placeholder={getPlaceholderForParameter(parameter)}
              type={parameter.schema?.type === 'number' ? 'number' : 'text'}
              required
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
    </>
  );
};
