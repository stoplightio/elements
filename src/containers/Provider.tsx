import { Resolver } from '@stoplight/json-ref-resolver';
import { IResolverOpts } from '@stoplight/json-ref-resolver/types';
import { SchemaTreeRefDereferenceFn } from '@stoplight/json-schema-viewer';
import { IComponentMapping } from '@stoplight/markdown-viewer';
import * as React from 'react';
import { Context } from 'react';
import { SWRConfig } from 'swr';

import { NodeIconMapping } from '../types';
import { createFetchClient, IFetchProps } from '../utils/createFetchClient';

export interface IProvider {
  host?: string;
  token?: string;
  projectToken?: string;
  components?: IComponentMapping;
  icons?: NodeIconMapping;
  resolver?: Resolver;
  inlineRefResolver?: SchemaTreeRefDereferenceFn;
}

const defaultHost = 'http://localhost:8080/api';
export const HostContext = createNamedContext('Context', defaultHost);
export const RequestContext = React.createContext<IFetchProps>({
  host: defaultHost,
  headers: null,
});
export const ComponentsContext = createNamedContext<IComponentMapping | undefined>('ComponentsContext', undefined);
export const ActiveSrnContext = createNamedContext('ActiveSrnContext', '');
export const ProjectTokenContext = createNamedContext('ProjectTokenContext', '');
export const ResolverContext = createNamedContext<Resolver | undefined>('ResolverContext', undefined);
export const ResolverOptionsContext = createNamedContext<IResolverOpts | undefined>(
  'ResolverOptionsContext',
  undefined,
);
export const InlineRefResolverContext = createNamedContext<SchemaTreeRefDereferenceFn | undefined>(
  'InlineRefResolverContext',
  undefined,
);

const defaultIcons: NodeIconMapping = {};
export const IconsContext = createNamedContext<NodeIconMapping>('IconsContext', defaultIcons);

export const Provider: React.FunctionComponent<IProvider> = ({
  host,
  token,
  projectToken,
  components,
  icons,
  resolver,
  inlineRefResolver,
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
  const fetcher = createFetchClient(requestContext);

  return (
    <InlineRefResolverContext.Provider value={inlineRefResolver}>
      <RequestContext.Provider value={requestContext}>
        <SWRConfig
          value={{
            refreshInterval: 0,
            shouldRetryOnError: false,
            revalidateOnFocus: false,
            dedupingInterval: 5 * 60 * 1000, // 5 minutes
            fetcher: async (input: RequestInfo, init?: RequestInit) => {
              return await (await fetcher(input, init)).json();
            },
          }}
        >
          <ProjectTokenContext.Provider value={projectToken ?? ''}>
            <ComponentsContext.Provider value={components}>
              <ResolverContext.Provider value={resolver}>
                <IconsContext.Provider value={icons || defaultIcons}>{children}</IconsContext.Provider>
              </ResolverContext.Provider>
            </ComponentsContext.Provider>
          </ProjectTokenContext.Provider>
        </SWRConfig>
      </RequestContext.Provider>
    </InlineRefResolverContext.Provider>
  );
};

function createNamedContext<T>(name: string, defaultValue: T): React.Context<T> {
  const context = React.createContext(defaultValue);
  context.displayName = name;
  return context;
}
