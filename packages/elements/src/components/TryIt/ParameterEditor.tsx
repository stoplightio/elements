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
  value?: string;
  onChange: (e: React.FormEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => void;
}

export const ParameterEditor: React.FC<ParameterProps> = ({ parameter, value, onChange }) => {
  const parameterValueOptions = parameterOptions(parameter);
  const examples = exampleOptions(parameter);
  const selectedExample = examples?.find(e => e.value === value) ?? selectExampleOption;
  return (
    <>
      <Input appearance="minimal" className="inline" readOnly value={parameter.name} />
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
              style={{ paddingLeft: 15 }}
              aria-label={parameter.name}
              appearance="minimal"
              flexGrow
              placeholder={getPlaceholderForParameter(parameter)}
              type={parameter.schema?.type === 'number' ? 'number' : 'text'}
              required
              value={value}
              onChange={onChange}
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
