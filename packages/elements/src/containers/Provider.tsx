import { IComponentMapping } from '@stoplight/markdown-viewer';
import * as React from 'react';
import { Client, Provider as UrqlProvider } from 'urql';

import { ComponentsProvider } from '../context/Components';
import { useUrqlClient } from '../hooks/useUrqlClient';
import { NodeIconMapping } from '../types';

export interface IProvider extends IActiveInfo {
  urqlClient?: Client;
  components?: IComponentMapping;
  authToken?: string;
}

export interface IActiveInfo {
  host: string;
  workspace: string;
  project: string;
  branch?: string;
  node?: string;
}

const defaultIcons: NodeIconMapping = {};
export const IconsContext = createNamedContext<NodeIconMapping>('IconsContext', defaultIcons);

const defaultInfo = {
  host: '',
  workspace: '',
  project: '',
  branch: '',
  node: '',
};
export const ActiveInfoContext = createNamedContext<IActiveInfo>('ActiveInfoContext', defaultInfo);

export const Provider: React.FC<IProvider> = ({
  host,
  workspace,
  project,
  branch,
  node,
  urqlClient,
  authToken,
  components,
  children,
}) => {
  const info = {
    host,
    workspace,
    project,
    branch,
    node,
  };

  const client = useUrqlClient(`${host}/graphql`, { urqlClient, authToken });

  return (
    <UrqlProvider value={client}>
      <IconsContext.Provider value={defaultIcons}>
        <ComponentsProvider value={components}>
          <ActiveInfoContext.Provider value={info}>{children}</ActiveInfoContext.Provider>
        </ComponentsProvider>
      </IconsContext.Provider>
    </UrqlProvider>
  );
};

function createNamedContext<T>(name: string, defaultValue: T): React.Context<T> {
  const context = React.createContext(defaultValue);
  context.displayName = name;
  return context;
}
