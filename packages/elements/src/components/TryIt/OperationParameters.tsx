import { Flex, Input, Panel, Select, Text } from '@stoplight/mosaic';
import {
  Dictionary,
  IHttpHeaderParam,
  IHttpParam,
  IHttpPathParam,
  IHttpQueryParam,
  INodeExample,
  INodeExternalExample,
} from '@stoplight/types';
import { map, sortBy } from 'lodash';
import * as React from 'react';

export interface OperationParameters {
  path?: IHttpPathParam[];
  query?: IHttpQueryParam[];
  headers?: IHttpHeaderParam[];
}

interface OperationParametersProps {
  operationParameters: OperationParameters;
  values: Dictionary<string, string>;
  onChangeValues: (newValues: Dictionary<string, string>) => void;
}

const booleanOptions = [
  { label: 'Not Set', value: '' },
  { label: 'False', value: 'false' },
  { label: 'True', value: 'true' },
];

const selectExampleOption = { value: '', label: 'Pick an example' };

export const OperationParameters: React.FC<OperationParametersProps> = ({
  operationParameters,
  values,
  onChangeValues,
}) => {
  const parameters = flattenParameters(operationParameters);

  const onChange = (parameter: IHttpParam) => (
    e: React.FormEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = e.currentTarget.value;
    onChangeValues({ ...values, [parameter.name]: newValue });
  };

  return (
    <Panel id="collapse-open" defaultIsOpen>
      <Panel.Titlebar>Parameters</Panel.Titlebar>
      <Panel.Content className="sl-overflow-y-auto OperationParametersContent">
        {parameters.map(parameter => {
          const parameterValueOptions = parameterOptions(parameter);
          const examples = exampleOptions(parameter);
          const selectedExample = examples?.find(e => e.value === values[parameter.name]) ?? selectExampleOption;
          return (
            <Flex align="center" key={parameter.name}>
              <Input appearance="minimal" readOnly value={parameter.name} />
              <Text mx={3}>:</Text>
              {parameterValueOptions ? (
                <Select
                  flexGrow
                  options={parameterValueOptions}
                  value={values[parameter.name]}
                  onChange={onChange(parameter)}
                />
              ) : (
                <Flex flexGrow>
                  <Input
                    style={{ paddingLeft: 15 }}
                    appearance="minimal"
                    flexGrow
                    placeholder={(parameter.schema?.default ?? parameter.schema?.type) as string}
                    type={parameter.schema?.type as string}
                    required
                    value={values[parameter.name] ?? ''}
                    onChange={onChange(parameter)}
                  />
                  {examples && (
                    <Select flexGrow value={selectedExample.value} options={examples} onChange={onChange(parameter)} />
                  )}
                </Flex>
              )}
            </Flex>
          );
        })}
      </Panel.Content>
    </Panel>
  );
};

function flattenParameters(parameters: OperationParameters) {
  const pathParameters = sortBy(parameters.path ?? [], ['name']);
  const queryParameters = sortBy(parameters.query ?? [], ['name']);
  const headerParameters = sortBy(parameters.headers ?? [], ['name']);
  return [...pathParameters, ...queryParameters, ...headerParameters];
}

export function initialParameterValues(operationParameters: OperationParameters) {
  const parameters = flattenParameters(operationParameters);

  const enums = Object.fromEntries(
    parameters
      .map(p => [p.name, p.schema?.enum ?? []] as const)
      .filter(([, enums]) => enums.length > 0)
      .map(([name, enums]) => [name, String(enums[0])]),
  );

  const examples = Object.fromEntries(
    parameters
      .map(p => [p.name, p.examples ?? []] as const)
      .filter(([, examples]) => examples.length > 0)
      .map(([name, examples]) => [name, exampleValue(examples[0])]),
  );

  return {
    // order matters - enums should be override examples
    ...examples,
    ...enums,
  };
}

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

function exampleValue(example: INodeExample | INodeExternalExample) {
  return 'value' in example ? example.value : example.externalValue;
}
