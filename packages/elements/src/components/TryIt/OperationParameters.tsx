import { Panel } from '@stoplight/mosaic';
import { Dictionary, IHttpHeaderParam, IHttpParam, IHttpPathParam, IHttpQueryParam } from '@stoplight/types';
import { sortBy } from 'lodash';
import * as React from 'react';

import { exampleValue, Parameter } from './Parameter';

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
    <Panel defaultIsOpen>
      <Panel.Titlebar>Parameters</Panel.Titlebar>
      <Panel.Content className="sl-overflow-y-auto OperationParametersContent">
        {parameters.map((parameter, i) => (
          <Parameter
            key={parameter.name}
            parameter={parameter}
            value={values[parameter.name]}
            onChange={onChange(parameter)}
          />
        ))}
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
