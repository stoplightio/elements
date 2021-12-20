import { Panel } from '@stoplight/mosaic';
import * as React from 'react';

import { ParameterSpec } from './parameter-utils';
import { ParameterEditor } from './ParameterEditor';

interface OperationParametersProps<P extends keyof any = string> {
  parameters: readonly ParameterSpec[];
  values: Record<P, string>;
  disabledParameters: string[];
  onChange: (parameterName: P, newValue: string) => void;
  toggleDisabled: (parameterName: P) => void;
  validate?: boolean;
}

export const OperationParameters: React.FC<OperationParametersProps> = ({
  parameters,
  values,
  onChange,
  toggleDisabled,
  disabledParameters,
  validate,
}) => {
  return (
    <Panel defaultIsOpen>
      <Panel.Titlebar>Parameters</Panel.Titlebar>
      <Panel.Content className="sl-overflow-y-auto ParameterGrid OperationParametersContent">
        {parameters.map(parameter => (
          <ParameterEditor
            key={parameter.name}
            parameter={parameter}
            value={values[parameter.name]}
            validate={validate}
            isDisabled={disabledParameters.includes(parameter.name)}
            onChangeValue={(value: string | number) => onChange(parameter.name, String(value))}
            onChangeDisabled={() => toggleDisabled(parameter.name)}
          />
        ))}
      </Panel.Content>
    </Panel>
  );
};
