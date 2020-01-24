import { Resolver } from '@stoplight/json-ref-resolver';
import { IComponentMapping } from '@stoplight/markdown-viewer';
import axios from 'axios';
import * as React from 'react';
import { NodeIconMapping } from '../types';

export interface IProvider {
  host?: string;
  token?: string;
  components?: IComponentMapping;
  icons?: NodeIconMapping;
  resolver?: Resolver;
}

const defaultHost = 'http://localhost:8080/api';
export const HostContext = React.createContext(defaultHost);
export const AxiosContext = React.createContext(axios.create());
export const ComponentsContext = React.createContext<IComponentMapping | undefined>(undefined);
export const ActiveSrnContext = React.createContext('');
export const ResolverContext = React.createContext<Resolver | undefined>(undefined);

const defaultIcons: NodeIconMapping = {};
export const IconsContext = React.createContext<NodeIconMapping>(defaultIcons);

export const Provider: React.FunctionComponent<IProvider> = ({
  host,
  token,
  components,
  icons,
  resolver,
  children,
}) => {
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
          <ResolverContext.Provider value={resolver}>
            <IconsContext.Provider value={icons || defaultIcons}>{children}</IconsContext.Provider>
          </ResolverContext.Provider>
        </ComponentsContext.Provider>
      </AxiosContext.Provider>
    </HostContext.Provider>
  );
};
