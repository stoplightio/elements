import { Panel } from '@stoplight/mosaic';
import * as React from 'react';

import { ParameterSpec } from './parameter-utils';
import { ParameterEditor } from './ParameterEditor';

interface OperationParametersProps<P extends keyof any = string> {
  parameters: readonly ParameterSpec[];
  values: Record<P, string>;
  onChangeValue: (parameterName: P, newValue: string) => void;
}

export const OperationParameters: React.FC<OperationParametersProps> = ({ parameters, values, onChangeValue }) => {
  return (
    <Panel defaultIsOpen>
      <Panel.Titlebar>Parameters</Panel.Titlebar>
      <Panel.Content className="sl-overflow-y-auto ParameterGrid OperationParametersContent">
        {parameters.map(parameter => (
          <ParameterEditor
            key={parameter.name}
            parameter={parameter}
            value={values[parameter.name]}
            onChange={(value: string | number) => onChangeValue(parameter.name, String(value))}
          />
        ))}
      </Panel.Content>
    </Panel>
  );
};
