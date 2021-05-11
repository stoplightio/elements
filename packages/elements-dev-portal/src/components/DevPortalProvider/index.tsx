import * as React from 'react';

export type DevPortalProviderProps = {
  platformUrl?: string;
};

export const PlatformUrlContext = React.createContext('https://stoplight.io');

export const DevPortalProvider: React.FC<DevPortalProviderProps> = ({ platformUrl = 'https://stoplight.io', children }) => {
  return (
    <PlatformUrlContext.Provider value={platformUrl}>
      {children}
    </PlatformUrlContext.Provider>
  );
};
