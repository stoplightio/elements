import { safeStringify } from '@stoplight/json';
import { Flex, Input, Select, Text } from '@stoplight/mosaic';
import { IHttpParam, INodeExample, INodeExternalExample } from '@stoplight/types';
import { isObject, map } from 'lodash';
import * as React from 'react';

interface ParameterProps {
  parameter: IHttpParam;
  value: string;
  onChange: (e: React.FormEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => void;
}

const booleanOptions = [
  { label: 'Not Set', value: '' },
  { label: 'False', value: 'false' },
  { label: 'True', value: 'true' },
];

const selectExampleOption = { value: '', label: 'Pick an example' };

export const Parameter: React.FC<ParameterProps> = ({ parameter, value, onChange }) => {
  const parameterValueOptions = parameterOptions(parameter);
  const examples = exampleOptions(parameter);
  const selectedExample = examples?.find(e => e.value === value) ?? selectExampleOption;
  return (
    <Flex align="center" key={parameter.name}>
      <Input appearance="minimal" readOnly value={parameter.name} />
      <Text mx={3}>:</Text>
      {parameterValueOptions ? (
        <Select flexGrow options={parameterValueOptions} value={value} onChange={onChange} />
      ) : (
        <Flex flexGrow>
          <Input
            style={{ paddingLeft: 15 }}
            appearance="minimal"
            flexGrow
            placeholder={getPlaceholderForParameter(parameter)}
            type={parameter.schema?.type === 'number' ? 'number' : 'text'}
            required
            value={value ?? ''}
            onChange={onChange}
          />
          {examples && <Select flexGrow value={selectedExample.value} options={examples} onChange={onChange} />}
        </Flex>
      )}
    </Flex>
  );
};

function parameterOptions(parameter: IHttpParam) {
  return parameter.schema?.type === 'boolean'
    ? booleanOptions
    : parameter.schema?.enum !== undefined
    ? map(parameter.schema.enum, v => (Number.isNaN(Number(v)) ? String(v) : Number(v)))
    : null;
}

function exampleOptions(parameter: IHttpParam) {
  return parameter.examples?.length && parameter.examples.length > 1
    ? [
        selectExampleOption,
        ...parameter.examples.map(example => ({ label: example.key, value: exampleValue(example) })),
      ]
    : null;
}

export function exampleValue(example: INodeExample | INodeExternalExample) {
  return 'value' in example ? example.value : example.externalValue;
}

function getPlaceholderForParameter(parameter: IHttpParam) {
  const defaultOrType = getDefaultForParameter(parameter) ?? parameter.schema?.type;
  return defaultOrType !== undefined ? String(defaultOrType) : undefined;
}

function getDefaultForParameter(parameter: IHttpParam) {
  const defaultValue = parameter.schema?.default;
  return isObject(defaultValue) ? safeStringify(defaultValue) : defaultValue;
}
