import * as React from 'react';

export type Visibility = {
  docsOnly?: boolean;
  hideTryIt?: boolean;
};

type VisibilityProviderProps = {
  visibility?: Visibility;
};

export const VisibilityContext = React.createContext<Visibility | undefined>(undefined);
VisibilityContext.displayName = 'VisibilityContext';

export const VisibilityProvider: React.FC<VisibilityProviderProps> = ({ children, visibility }) => {
  return <VisibilityContext.Provider value={visibility}>{children}</VisibilityContext.Provider>;
};
