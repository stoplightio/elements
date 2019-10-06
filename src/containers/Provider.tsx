import { IComponentMapping } from '@stoplight/markdown-viewer';
import axios from 'axios';
import * as React from 'react';

export interface IProvider {
  host?: string;
  token?: string;
  components?: IComponentMapping;
}

const defaultHost = 'http://localhost:4060';
export const HostContext = React.createContext(defaultHost);
export const AxiosContext = React.createContext(axios.create());
export const ComponentsContext = React.createContext<IComponentMapping | undefined>(undefined);
export const ActiveSrnContext = React.createContext('');

export const Provider: React.FunctionComponent<IProvider> = ({ host, token, components, children }) => {
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
      </AxiosContext.Provider>
    </HostContext.Provider>
  );
};
