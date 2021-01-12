import { Flex, Input, Select, Text } from '@stoplight/mosaic';
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
  value: string;
  onChange: (parameterValue: string) => void;
}

export const ParameterEditor: React.FC<ParameterProps> = (props) => {
  const { parameter, value, onChange } = props;
  const parameterValueOptions = parameterOptions(parameter);
  const examples = exampleOptions(parameter);
  const selectedExample = examples?.find(e => e.value === value) ?? selectExampleOption;

  return (
    <Flex align="center" key={parameter.name}>
      <Input appearance="minimal" readOnly value={parameter.name} />
      <Text mx={3}>:</Text>
      {parameterValueOptions ? (
        <Select
          flexGrow
          aria-label={parameter.name}
          options={parameterValueOptions}
          value={typeof value === 'string' ? value : ''}
          onChange={e => onChange(e.currentTarget.value)}
        />
      ) : (
        <Flex flexGrow>
          <Input
            style={{ paddingLeft: 15 }}
            aria-label={parameter.name}
            appearance="minimal"
            flexGrow
            placeholder={getPlaceholderForParameter(parameter)}
            type={parameter.schema?.type === 'number' ? 'number' : 'text'}
            required
            value={value}
            onChange={e => onChange(e.currentTarget.value)}
          />
          {examples && (
            <Select
              aria-label={`${parameter.name}-select`}
              flexGrow
              value={selectedExample.value}
              options={examples}
              onChange={e => onChange(e.currentTarget.value)}
            />
          )}
        </Flex>
      )}
    </Flex>
  );
};
