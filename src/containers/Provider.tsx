import { IComponentMapping } from '@stoplight/markdown-viewer';
import { Dictionary, NodeType } from '@stoplight/types';
import { IconName } from '@stoplight/ui-kit';
import axios from 'axios';
import * as React from 'react';

export interface IProvider {
  host?: string;
  token?: string;
  components?: IComponentMapping;
  icons?: Dictionary<IconName, NodeType>;
}

const defaultHost = 'http://localhost:4060';
export const HostContext = React.createContext(defaultHost);
export const AxiosContext = React.createContext(axios.create());
export const ComponentsContext = React.createContext<IComponentMapping | undefined>(undefined);
export const IconsContext = React.createContext<{ [type in NodeType]?: IconName }>({});

export const Provider: React.FunctionComponent<IProvider> = ({ host, token, components, icons, children }) => {
  const client = React.useMemo(
    () =>
      axios.create({
        baseURL: host || defaultHost,
        headers: token && {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }),
    [host, token],
  );

  return (
    <HostContext.Provider value={host || defaultHost}>
      <AxiosContext.Provider value={client}>
        <ComponentsContext.Provider value={components}>{children}</ComponentsContext.Provider>
        {icons ? <IconsContext.Provider value={icons}></IconsContext.Provider> : null}
      </AxiosContext.Provider>
    </HostContext.Provider>
  );
};
