import { Dictionary, INodeVariable } from '@stoplight/types';
import { InputGroup } from '@stoplight/ui-kit';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useRequestMakerStore } from '../../../hooks';
import { IVariable } from '../../../stores/request-maker/request';
import { cleanVariableValue } from '../../../utils/variables';

interface IRequestServerVariables {
  serverVariables: Dictionary<INodeVariable, string>;
  baseUrl: string;
}

export const RequestServerVariables = observer<IRequestServerVariables>(({ serverVariables, baseUrl }) => {
  const requestStore = useRequestMakerStore('request');
  const requestVariables = requestStore.requestVariables.map((v: any) => cleanVariableValue(v));

  if (!requestVariables) return <div className="p-3 flex items-center justify-center">No Variables</div>;

  const handleServerVariableChange = (url: string, varName: string, value: string) => {
    requestStore.updateServerVariables(url, varName, value);
    requestStore.updateServers(varName, value);
  };

  const handleRequestVariableChange = (varName: string, value: string) => {
    requestStore.setVariable(varName, value);
  };

  const findServerVariable = (servers: IVariable[], url: string, value: string) => {
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

  const serverValues = Object.values(serverVariables);
  // const formattedVars = requestStore.formatVariables(requestVariables);
  // console.log(formattedVars);

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
                placeholder={serverValues[i].description || 'description'}
                value={
                  findServerVariable(requestStore.serverVariables, baseUrl, serverValues[i].default) ||
                  serverValues[i].default
                }
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleServerVariableChange(baseUrl, v, event.currentTarget.value)
                }
              />
            </div>
          </div>
        </div>
      ))}
      {Object.keys(requestStore.variables).map((v: any) => (
        <div key={v}>
          <div className="border-b RequestMaker__RequestServers">
            <div className="flex items-center justify-center">
              <InputGroup className="h-full border-r" type="text" placeholder={v} value={v} readOnly />
              <InputGroup
                className="flex-1 w-full h-full"
                type="text"
                placeholder={'description'}
                value={requestStore.variables[v] ? requestStore.variables[v].default : ''}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleRequestVariableChange(v, event.currentTarget.value)
                }
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});
