import { IComponentMapping } from '@stoplight/markdown-viewer';
import * as React from 'react';
import { Client, Provider as UrqlProvider } from 'urql';

import { defaultComponents } from '../hooks/useComponents';
import { NodeIconMapping } from '../types';
import { getUrqlClient } from '../utils/urql';

export interface IProvider {
  host: string;
  workspace: string;
  project: string;
  branch: string;
  node: string;

  urqlClient?: Client;
  components?: IComponentMapping;
}

export const ComponentsContext = React.createContext<IComponentMapping | undefined>(defaultComponents);

const defaultIcons: NodeIconMapping = {};
export const IconsContext = React.createContext<NodeIconMapping>(defaultIcons);

const defaultInfo = {
  workspace: '',
  project: '',
  branch: '',
  node: '',
};
export const ActiveInfoContext = React.createContext<{
  workspace: string;
  project: string;
  branch: string;
  node: string;
}>(defaultInfo);

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
    workspace,
    project,
    branch,
    node,
  };

  const client = getUrqlClient(host, urqlClient);

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
