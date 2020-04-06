import { IComponentMapping } from '@stoplight/markdown-viewer';
import * as React from 'react';
import { Client, Provider as UrqlProvider } from 'urql';

import { defaultComponents } from '../hooks/useComponents';
import { NodeIconMapping } from '../types';
import { getUrqlClient } from '../utils/urql';

export interface IProvider extends IActiveInfo {
  urqlClient?: Client;
  components?: IComponentMapping;
}

export interface IActiveInfo {
  host: string;
  workspace: string;
  project: string;
  branch?: string;
  node?: string;
}

export const ComponentsContext = createNamedContext<IComponentMapping | undefined>(
  'ComponentsContext',
  defaultComponents,
);

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

  const client = getUrqlClient(`${host}/graphql`, urqlClient);

  return (
    <UrqlProvider value={client}>
      <IconsContext.Provider value={defaultIcons}>
        <ComponentsContext.Provider value={components}>
          <ActiveInfoContext.Provider value={info}>{children}</ActiveInfoContext.Provider>
        </ComponentsContext.Provider>
      </IconsContext.Provider>
    </UrqlProvider>
  );
};

function createNamedContext<T>(name: string, defaultValue: T): React.Context<T> {
  const context = React.createContext(defaultValue);
  context.displayName = name;
  return context;
}
