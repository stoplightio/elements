import { Panel } from '@stoplight/mosaic';
import { Dictionary } from '@stoplight/types';
import { sortBy } from 'lodash';
import * as React from 'react';

import { ParameterSpec } from './parameter-utils';
import { ParameterEditor } from './ParameterEditor';

type OperationParameters = Record<'path' | 'query' | 'headers', readonly ParameterSpec[] | undefined>;

interface OperationParametersProps {
  operationParameters: OperationParameters;
  values: Dictionary<string, string>;
  onChangeValues: (newValues: Dictionary<string | File, string>) => void;
}

export const OperationParameters: React.FC<OperationParametersProps> = ({
  operationParameters,
  values,
  onChangeValues,
}) => {
  const parameters = flattenParameters(operationParameters);

  const onChange = (name: string) => (value: string | File) => {
    onChangeValues({ ...values, [name]: value });
  };

  return (
    <Panel defaultIsOpen>
      <Panel.Titlebar>Parameters</Panel.Titlebar>
      <Panel.Content className="sl-overflow-y-auto OperationParametersContent">
        {parameters.map(parameter => (
          <ParameterEditor
            key={parameter.name}
            parameter={parameter}
            value={values[parameter.name]}
            onChange={onChange(parameter.name)}
          />
        ))}
      </Panel.Content>
    </Panel>
  );
};

export function flattenParameters(parameters: OperationParameters): ParameterSpec[] {
  const pathParameters = sortBy(parameters.path ?? [], ['name']);
  const queryParameters = sortBy(parameters.query ?? [], ['name']);
  const headerParameters = sortBy(parameters.headers ?? [], ['name']);
  return [...pathParameters, ...queryParameters, ...headerParameters];
}
