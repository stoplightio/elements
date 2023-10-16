import { Panel } from '@stoplight/mosaic';
import * as React from 'react';

import { ServerVariable } from '../../../utils/http-spec/IServer';
import { VariableEditor } from './VariableEditor';

interface ServerVariablesProps<P extends keyof any = string> {
  variables: readonly ServerVariable[];
  values: Record<P, string>;
  onChangeValue: (op: 'set' | 'unset', variableName: P, newValue: string) => void;
}

export const ServerVariables: React.FC<ServerVariablesProps> = ({ variables, values, onChangeValue }) => {
  return (
    <Panel defaultIsOpen data-test="server-vars-try-it">
      <Panel.Titlebar>Server Variables</Panel.Titlebar>
      <Panel.Content className="sl-overflow-y-auto ParameterGrid ServerVariablesContent">
        {variables.map(variable => (
          <VariableEditor
            key={variable.name}
            data-test="server-vars-try-it-row"
            variable={variable}
            value={values[variable.name]}
            onChange={value => {
              const actualValue = String(value);
              onChangeValue(variable.enum || actualValue !== '' ? 'set' : 'unset', variable.name, actualValue);
            }}
          />
        ))}
      </Panel.Content>
    </Panel>
  );
};
