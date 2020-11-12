import { IComponentMapping } from '@stoplight/markdown-viewer';
import * as React from 'react';

import { ComponentsProvider } from '../context/Components';
import { NodeIconMapping } from '../types';

export interface IProvider extends IActiveInfo {
  components?: IComponentMapping;
  authToken?: string;
}

export interface IActiveInfo {
  host?: string | undefined;
  workspace: string;
  project: string;
  branch?: string;
  node?: string;
  authToken?: string;
}

const defaultIcons: NodeIconMapping = {};
export const IconsContext = createNamedContext<NodeIconMapping>('IconsContext', defaultIcons);

const defaultInfo = {
  host: '',
  workspace: '',
  project: '',
  branch: '',
  node: '',
  authToken: '',
};
export const ActiveInfoContext = createNamedContext<IActiveInfo>('ActiveInfoContext', defaultInfo);

export const Provider: React.FC<IProvider> = ({
  host,
  workspace,
  project,
  branch,
  node,
  components,
  children,
  authToken,
}) => {
  const info = {
    host,
    workspace,
    project,
    branch,
    node,
    authToken,
  };

  return (
    <IconsContext.Provider value={defaultIcons}>
      <ComponentsProvider value={components}>
        <ActiveInfoContext.Provider value={info}>{children}</ActiveInfoContext.Provider>
      </ComponentsProvider>
    </IconsContext.Provider>
  );
};

function createNamedContext<T>(name: string, defaultValue: T): React.Context<T> {
  const context = React.createContext(defaultValue);
  context.displayName = name;
  return context;
}
