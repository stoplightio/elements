import { Flex, Input, Panel, Text } from '@stoplight/mosaic';
import { useAtom } from 'jotai';
import * as React from 'react';

import { chosenServerAtom } from '../chosenServer';
import { chosenServerVariablesAtom } from '../chosenServerVariables';

interface TryItServersProps {}

export const TryItServers: React.FC<TryItServersProps> = () => {
  const [chosenServer, _] = useAtom(chosenServerAtom);
  const [chosenServerVariables, setChosenServerVariables] = useAtom(chosenServerVariablesAtom);

  if (!chosenServer || !chosenServer.variables || Object.entries(chosenServer.variables).length === 0) {
    return null;
  }

  return (
    <Panel defaultIsOpen>
      <Panel.Titlebar>Server</Panel.Titlebar>
      <Panel.Content className="ParameterGrid">
        {Object.entries(chosenServer.variables).map(([key, value]) => (
          <React.Fragment key={key}>
            <div>{key}</div>
            <Text mx={3}>:</Text>
            <Flex flex={1}>
              <Input
                style={{ paddingLeft: 15 }}
                aria-label={key}
                appearance="minimal"
                flex={1}
                placeholder={value.description}
                value={chosenServerVariables[key] ?? value.default}
                type="text"
                required
                onChange={e => setChosenServerVariables(vars => ({ ...vars, [key]: e.target.value }))}
              />
            </Flex>
          </React.Fragment>
        ))}
      </Panel.Content>
    </Panel>
  );
};
