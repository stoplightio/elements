import { Resolver } from '@stoplight/json-ref-resolver';
import { IComponentMapping } from '@stoplight/markdown-viewer';
import * as React from 'react';
import { NodeIconMapping } from '../types';

export interface IProvider {
  host?: string;
  token?: string;
  components?: IComponentMapping;
  icons?: NodeIconMapping;
  resolver?: Resolver;
}

const defaultHost = 'http://localhost:4060';
export const HostContext = React.createContext(defaultHost);
export const TokenContext = React.createContext('');
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
  return (
    <HostContext.Provider value={host || defaultHost}>
      <TokenContext.Provider value={token || ''}>
        <ComponentsContext.Provider value={components}>
          <ResolverContext.Provider value={resolver}>
            <IconsContext.Provider value={icons || defaultIcons}>{children}</IconsContext.Provider>
          </ResolverContext.Provider>
        </ComponentsContext.Provider>
      </TokenContext.Provider>
    </HostContext.Provider>
  );
};
