import { IComponentMapping } from '@stoplight/markdown-viewer';
import axios from 'axios';
import * as React from 'react';
import { NodeIconMapping } from '../hooks/useComputeToc';

export interface IProvider {
  host?: string;
  token?: string;
  components?: IComponentMapping;
  icons?: NodeIconMapping;
}

const defaultHost = 'http://localhost:4060';
export const HostContext = React.createContext(defaultHost);
export const AxiosContext = React.createContext(axios.create());
export const ComponentsContext = React.createContext<IComponentMapping | undefined>(undefined);

const defaultIcons: NodeIconMapping = {};
export const IconsContext = React.createContext<NodeIconMapping>(defaultIcons);

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
        <ComponentsContext.Provider value={components}>
          <IconsContext.Provider value={icons || defaultIcons}>{children}</IconsContext.Provider>
        </ComponentsContext.Provider>
      </AxiosContext.Provider>
    </HostContext.Provider>
  );
};
