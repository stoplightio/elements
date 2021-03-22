import { ParsedNode } from '@stoplight/elements-utils';
import { IComponentMapping } from '@stoplight/markdown-viewer';
import * as React from 'react';

import { MockUrlResult } from '../components/TryIt/mocking-utils';
import { ComponentsProvider } from '../context/Components';
import { IActiveInfo, NodeIconMapping } from '../types';

export interface IProvider extends IActiveInfo {
  components?: IComponentMapping;
  authToken?: string;
  isStoplightProjectComponent?: boolean;
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
  isStoplightProjectComponent: false,
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
  isStoplightProjectComponent,
}) => {
  const info = {
    host,
    workspace,
    project,
    branch,
    node,
    authToken,
    isStoplightProjectComponent,
  };

  return (
    <IconsContext.Provider value={defaultIcons}>
      <ComponentsProvider value={components}>
        <ActiveInfoContext.Provider value={info}>{children}</ActiveInfoContext.Provider>
      </ComponentsProvider>
    </IconsContext.Provider>
  );
};

export const StoplightProjectContext = createNamedContext<{
  mockUrl: MockUrlResult | undefined;
}>('mockUrlValue', { mockUrl: undefined });

export const StoplightComponentProvider: React.FC<{
  mockUrl: MockUrlResult | undefined;
}> = ({ mockUrl, children }) => {
  const info = { mockUrl };
  return <StoplightProjectContext.Provider value={info}>{children}</StoplightProjectContext.Provider>;
};

export function createNamedContext<T>(name: string, defaultValue: T): React.Context<T> {
  const context = React.createContext(defaultValue);
  context.displayName = name;
  return context;
}
