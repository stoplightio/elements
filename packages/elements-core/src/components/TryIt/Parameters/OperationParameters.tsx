import { Panel } from '@stoplight/mosaic';
import * as React from 'react';

import { useLayoutConfig } from '../../../context/LayoutConfigContext';
import { ParameterSpec } from './parameter-utils';
import { ParameterEditor } from './ParameterEditor';

interface OperationParametersProps<P extends keyof any = string> {
  parameters: readonly ParameterSpec[];
  values: Record<P, string>;
  onChangeValue: (parameterName: P, newValue: string) => void;
  validate?: boolean;
}

export const OperationParameters: React.FC<OperationParametersProps> = ({
  parameters,
  values,
  onChangeValue,
  validate,
}) => {
  const layoutConfig = useLayoutConfig();
  return (
    <Panel defaultIsOpen>
      <Panel.Titlebar>{layoutConfig?.operationParameters?.title ?? 'Parameters'}</Panel.Titlebar>
      <Panel.Content className="sl-overflow-y-auto ParameterGrid OperationParametersContent">
        {parameters.map(parameter => (
          <ParameterEditor
            key={parameter.name}
            parameter={parameter}
            value={values[parameter.name]}
            onChange={(value: string | number) => onChangeValue(parameter.name, String(value))}
            validate={validate}
            isOptional={false}
            canChangeOptional={false}
            onChangeOptional={() => {}}
          />
        ))}
      </Panel.Content>
    </Panel>
  );
};
