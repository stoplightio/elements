import { withMosaicProvider, withPersistenceBoundary, withQueryClientProvider } from '@stoplight/elements-core';
import * as React from 'react';

export type DevPortalProviderProps = {
  platformUrl?: string;
  platformAuthToken?: string;
  isLoggedIn?: boolean;
};

export const PlatformContext = React.createContext<DevPortalProviderProps>({ platformUrl: 'https://stoplight.io' });

const PlatformProvider: React.FC<DevPortalProviderProps> = ({
  platformUrl = 'https://stoplight.io',
  platformAuthToken,
  isLoggedIn,
  children,
}) => {
  return (
    <PlatformContext.Provider value={{ platformUrl, platformAuthToken, isLoggedIn }}>
      {children}
    </PlatformContext.Provider>
  );
};

export const DevPortalProvider = withPersistenceBoundary(withQueryClientProvider(withMosaicProvider(PlatformProvider)));
