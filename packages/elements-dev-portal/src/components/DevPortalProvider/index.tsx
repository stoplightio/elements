import { withMosaicProvider, withPersistenceBoundary, withQueryClientProvider } from '@stoplight/elements-core';
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
  return <PlatformContext.Provider value={{ platformUrl, platformAuthToken }}>{children}</PlatformContext.Provider>;
};

export const DevPortalProvider = withPersistenceBoundary(withQueryClientProvider(withMosaicProvider(PlatformProvider)));
