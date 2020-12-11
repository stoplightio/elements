import { Flex, Input, Panel, Select, Text } from '@stoplight/mosaic';
import {
  Dictionary,
  IHttpHeaderParam,
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

export const OperationParameters: React.FC<OperationParametersProps> = ({
  operationParameters,
  values,
  onChangeValues,
}) => {
  const parameters = flattenParameters(operationParameters);

  const onChange = React.useCallback(
    parameter => (e: React.FormEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.currentTarget.value;
      onChangeValues({ ...values, [parameter.name]: newValue });
    },
    [onChangeValues, values],
  );

  return (
    <Panel id="collapse-open" defaultIsOpen>
      <Panel.Titlebar>Parameters</Panel.Titlebar>
      <Panel.Content className="sl-overflow-y-auto OperationParametersContent">
        {parameters.map(parameter => {
          const parameterValueOptions = parameterOptions(parameter);
          const examples = exampleOptions(parameter);
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
                  {examples && <Select flexGrow options={examples} onChange={onChange(parameter)} />}
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
  const enums = parameters
    .filter(p => p.schema?.enum)
    .reduce((params, p) => {
      if (p.schema?.enum?.length) {
        return { ...params, [p.name]: String(p.schema?.enum[0]) };
      } else {
        return { ...params };
      }
    }, {});
  const examples = parameters
    .filter(p => Array.isArray(p.examples))
    .reduce((params, p) => {
      if (p.examples?.length) {
        return {
          ...params,
          [p.name]: exampleValue(p.examples[0]),
        };
      } else {
        return { ...params };
      }
    }, {});

  return {
    // order matters - enums should be override examples
    ...examples,
    ...enums,
  };
}

function parameterOptions(parameter: IHttpPathParam | IHttpQueryParam) {
  return parameter.schema?.type === 'boolean'
    ? booleanOptions
    : parameter.schema?.enum !== undefined
    ? map(parameter.schema.enum, v => {
        return Number.isNaN(Number(v)) ? String(v) : Number(v);
      })
    : null;
}

function exampleOptions(parameter: IHttpPathParam | IHttpQueryParam) {
  return parameter.examples?.length && parameter.examples.length > 1
    ? parameter.examples.map(example => ({ label: example.key, value: exampleValue(example) }))
    : null;
}

function exampleValue(example: INodeExample | INodeExternalExample) {
  return 'value' in example
    ? (example as INodeExample).value
    : 'externalValue' in example
    ? (example as INodeExternalExample).externalValue
    : '';
}
