import { Dictionary, INodeVariable } from '@stoplight/types';
import { InputGroup } from '@stoplight/ui-kit';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useRequestMakerStore } from '../../../hooks';
import { IVariable } from '../../../stores/request-maker/request';

interface IRequestServerVariables {
  serverVariables: Dictionary<INodeVariable, string>;
  baseUrl: string;
}

export const RequestServerVariables = observer<IRequestServerVariables>(({ serverVariables, baseUrl }) => {
  const requestStore = useRequestMakerStore('request');

  const handleVariableChange = React.useCallback(
    (url: string, varName: string, value: string) => {
      requestStore.updateServerVariables(url, varName, value);
      requestStore.updateServers(varName, value);
    },
    [requestStore],
  );

  if (!serverVariables) return <div className="p-3 flex items-center justify-center">No Variables</div>;

  const values = Object.values(serverVariables);

  const findVariable = (servers: IVariable[], url: string, value: string) => {
    const serv = servers.find(s => s.url === url);
    if (serv && serv.variables) {
      for (const v in serv.variables) {
        if (!serv.variables[v]) continue;

        if (serv.variables[v].default === value) {
          return serv.variables[v].default;
        }
      }
    }

    return null;
  };

  return (
    <div>
      {Object.keys(serverVariables).map((v, i) => (
        <div key={v}>
          <div className="border-b RequestMaker__RequestServers">
            <div className="flex items-center justify-center">
              <InputGroup className="h-full border-r" type="text" placeholder={v} value={v} readOnly />
              <InputGroup
                className="flex-1 w-full h-full"
                type="text"
                placeholder={values[i].description || 'description'}
                value={findVariable(requestStore.serverVariables, baseUrl, values[i].default) || values[i].default}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleVariableChange(baseUrl, v, event.currentTarget.value)
                }
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});
