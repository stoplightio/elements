import { Panel } from '@stoplight/mosaic';
import * as React from 'react';

import { ServerVariable } from '../../../utils/http-spec/IServer';
import { VariableEditor } from './VariableEditor';

interface ServerVariablesProps<P extends keyof any = string> {
  variables: readonly ServerVariable[];
  values: Record<P, string>;
  onChangeValue: (variableName: P, newValue: string) => void;
  validate?: boolean;
}

export const ServerVariables: React.FC<ServerVariablesProps> = ({ variables, values, onChangeValue, validate }) => {
  return (
    <Panel defaultIsOpen>
      <Panel.Titlebar>Variables</Panel.Titlebar>
      <Panel.Content className="sl-overflow-y-auto ParameterGrid ServerVariablesContent">
        {variables.map(variable => (
          <VariableEditor
            key={variable.name}
            variable={variable}
            value={values[variable.name]}
            onChange={(value: string | number) => onChangeValue(variable.name, String(value))}
            validate={validate}
          />
        ))}
      </Panel.Content>
    </Panel>
  );
};
