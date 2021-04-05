import { Flex, Input, Select, SelectProps, Text } from '@stoplight/mosaic';
import * as React from 'react';

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
  const parameterValueOptions = parameterOptions(parameter);
  const examples = exampleOptions(parameter);
  const selectedExample = examples?.find(e => e.value === value) ?? selectExampleOption;
  const parameterDisplayName = `${parameter.name}${parameter.required ? '*' : ''}`;

  return (
    <>
      <Input appearance="minimal" readOnly value={parameterDisplayName} />
      <Text mx={3}>:</Text>
      <div>
        {parameterValueOptions ? (
          <Select
            flexGrow
            aria-label={parameter.name}
            options={parameterValueOptions}
            value={value}
            onChange={onChange}
          />
        ) : (
          <Flex flexGrow>
            <Input
              aria-label={parameter.name}
              appearance="minimal"
              flexGrow
              placeholder={getPlaceholderForParameter(parameter)}
              type={parameter.schema?.type === 'number' ? 'number' : 'text'}
              required
              value={value}
              onChange={e => onChange && onChange(e.currentTarget.value)}
            />
            {examples && (
              <Select
                aria-label={`${parameter.name}-select`}
                flexGrow
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
