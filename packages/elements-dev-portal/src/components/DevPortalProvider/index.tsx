import { withQueryClientProvider } from '@stoplight/elements-core';
import { Provider as MosaicProvider } from '@stoplight/mosaic';
import * as React from 'react';

export type DevPortalProviderProps = {
  platformUrl?: string;
  platformAuthToken?: string;
};

export const PlatformContext = React.createContext<DevPortalProviderProps>({ platformUrl: 'https://stoplight.io' });

const PlatformProvider: React.FC<DevPortalProviderProps> = ({
  platformUrl = 'https://stoplight.io',
  platformAuthToken,
  children,
}) => {
  return (
    <PlatformContext.Provider value={{ platformUrl, platformAuthToken }}>
      <MosaicProvider>{children}</MosaicProvider>
    </PlatformContext.Provider>
  );
};

export const DevPortalProvider = withQueryClientProvider(PlatformProvider);
