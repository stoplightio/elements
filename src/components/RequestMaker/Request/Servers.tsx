import { IServer } from '@stoplight/types';
import { InputGroup } from '@stoplight/ui-kit';
import { find } from 'lodash';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useRequestMakerStore } from '../../../hooks';
import { IVariable } from '../../../stores/request-maker/request';

export interface IRequestServer {
  server?: IServer;
}

export const RequestServers = observer<IRequestServer>(({ server }) => {
  const requestStore = useRequestMakerStore('request');

  const handleVariableChange = React.useCallback(
    (url: string, varName: string, value: string) => {
      requestStore.updateServerVariables(url, varName, value);
      requestStore.updateServers(varName, value);
    },
    [requestStore],
  );

  if (!server || !server.variables) return <div className="p-3 flex items-center justify-center">No Variables</div>;

  const values = Object.values(server.variables);

  const findVariable = (servers: IVariable[], url: string, value: string) => {
    const serv = find(servers, s => s.url === url);
    if (serv && serv.variables) {
      for (const v in serv.variables) {
        if (!v) continue;
        if (serv.variables[v].default === value) {
          return serv.variables[v].default;
        }
      }
    }

    return null;
  };

  return (
    <div>
      {Object.keys(server.variables).map((v, i) => (
        <div key={i}>
          <div className="border-b RequestMaker__RequestServers">
            <div className="flex items-center justify-center">
              <InputGroup
                // autoFocus={inFocus.index === index && inFocus.prop === 'name'}
                // onBlur={() => checkParam(param, index)}
                className="h-full border-r"
                type="text"
                placeholder={v}
                value={v}
                onChange={() => void 0}
                readOnly
              />
              <InputGroup
                // autoFocus={inFocus.index === index && inFocus.prop === 'name'}
                // onBlur={() => checkParam(param, index)}
                className="flex-1 w-full h-full"
                type="text"
                placeholder={values[i].description || 'description'}
                value={findVariable(requestStore.serverVariables, server.url, values[i].default) || values[i].default}
                onChange={(event: any) => handleVariableChange(server.url, v, event.currentTarget.value)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});
