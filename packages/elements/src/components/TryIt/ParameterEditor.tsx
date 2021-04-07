import { Flex, Input, Select, SelectProps, Text } from '@stoplight/mosaic';
import { nanoid } from 'nanoid';
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
  const uniqueId = React.useRef(nanoid()).current;
  const parameterValueOptions = parameterOptions(parameter);
  const examples = exampleOptions(parameter);
  const selectedExample = examples?.find(e => e.value === value) ?? selectExampleOption;
  const parameterDisplayName = `${parameter.name}${parameter.required ? '*' : ''}`;

  return (
    <>
      <div id={`param_name_${uniqueId}`}>{parameterDisplayName}</div>
      <Text mx={3}>:</Text>
      <div>
        {parameterValueOptions ? (
          <Select
            flex={1}
            aria-labelledby={`param_name_${uniqueId}`}
            options={parameterValueOptions}
            value={value}
            onChange={onChange}
          />
        ) : (
          <Flex flex={1}>
            <Input
              aria-label={parameter.name}
              appearance="minimal"
              flex={1}
              placeholder={getPlaceholderForParameter(parameter)}
              type={parameter.schema?.type === 'number' ? 'number' : 'text'}
              required
              value={value}
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
