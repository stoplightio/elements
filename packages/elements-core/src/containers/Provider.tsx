import * as React from 'react';

import { MockUrlResult } from '../components/TryIt/mocking-utils';
import { IActiveInfo } from '../types';

export interface IProvider extends IActiveInfo {}

const defaultInfo = {
  host: '',
  workspace: '',
  project: '',
  branch: '',
  node: '',
  authToken: '',
  showMocking: false,
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
  showMocking,
}) => {
  const info = {
    host,
    workspace,
    project,
    branch,
    node,
    authToken,
    showMocking,
  };

  return <ActiveInfoContext.Provider value={info}>{children}</ActiveInfoContext.Provider>;
};

export const MockingContext = createNamedContext<{
  mockUrl: MockUrlResult | undefined;
}>('MockingContext', { mockUrl: undefined });

export const MockingProvider: React.FC<{
  mockUrl: MockUrlResult | undefined;
}> = ({ mockUrl, children }) => {
  const info = { mockUrl };
  return <MockingContext.Provider value={info}>{children}</MockingContext.Provider>;
};

export function createNamedContext<T>(name: string, defaultValue: T): React.Context<T> {
  const context = React.createContext(defaultValue);
  context.displayName = name;
  return context;
}
