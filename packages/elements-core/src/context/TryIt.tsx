import * as React from 'react';

type TryItInfo = {
  hideTryIt?: boolean;
  showMocking?: boolean;
};

export const TryItContext = React.createContext<TryItInfo | undefined>(undefined);
TryItContext.displayName = 'TryItContext';

export const TryItProvider: React.FC<TryItInfo> = ({ children, ...props }) => {
  return <TryItContext.Provider value={props}>{children}</TryItContext.Provider>;
};
