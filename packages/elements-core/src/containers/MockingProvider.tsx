import * as React from 'react';

export const MockingContext = createNamedContext<{
  mockUrl?: string;
  hideMocking?: boolean;
}>('MockingContext', { mockUrl: undefined, hideMocking: undefined });

export const MockingProvider: React.FC<{
  mockUrl?: string;
  hideMocking?: boolean;
}> = ({ mockUrl, hideMocking, children }) => {
  const info = {
    mockUrl,
    hideMocking: hideMocking || !mockUrl, // Mocking is hidden if no mock url is provided or if is forced hidden
  };
  return <MockingContext.Provider value={info}>{children}</MockingContext.Provider>;
};

function createNamedContext<T>(name: string, defaultValue: T): React.Context<T> {
  const context = React.createContext(defaultValue);
  context.displayName = name;
  return context;
}
