import { Resolver } from '@stoplight/json-ref-resolver';
import { IComponentMapping } from '@stoplight/markdown-viewer';
import * as React from 'react';
import { NodeIconMapping } from '../types';
import { IFetchProps } from '../utils/createFetchClient';

export interface IProvider {
  host?: string;
  token?: string;
  projectToken?: string;
  components?: IComponentMapping;
  icons?: NodeIconMapping;
  resolver?: Resolver;
}

const defaultHost = 'http://localhost:4060';
export const HostContext = React.createContext(defaultHost);
export const RequestContext = React.createContext<IFetchProps>({
  host: defaultHost,
  headers: null,
});
export const ComponentsContext = React.createContext<IComponentMapping | undefined>(undefined);
export const ActiveSrnContext = React.createContext('');
export const ProjectTokenContext = React.createContext('');
export const ResolverContext = React.createContext<Resolver | undefined>(undefined);

const defaultIcons: NodeIconMapping = {};
export const IconsContext = React.createContext<NodeIconMapping>(defaultIcons);

export const Provider: React.FunctionComponent<IProvider> = ({
  host,
  token,
  projectToken,
  components,
  icons,
  resolver,
  children,
}) => {
  const requestContext = React.useMemo<IFetchProps>(
    () => ({
      host: host || defaultHost,
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : null,
    }),
    [host, token],
  );

  return (
    <RequestContext.Provider value={requestContext}>
      <ProjectTokenContext.Provider value={projectToken ?? ''}>
        <ComponentsContext.Provider value={components}>
          <ResolverContext.Provider value={resolver}>
            <IconsContext.Provider value={icons || defaultIcons}>{children}</IconsContext.Provider>
          </ResolverContext.Provider>
        </ComponentsContext.Provider>
      </ProjectTokenContext.Provider>
    </RequestContext.Provider>
  );
};
