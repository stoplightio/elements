import * as React from 'react';

import { MockUrlResult } from '../components/TryIt/mocking-utils';
import { IActiveInfo, NodeIconMapping } from '../types';

export interface IProvider extends IActiveInfo {
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
      <ActiveInfoContext.Provider value={info}>{children}</ActiveInfoContext.Provider>
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
