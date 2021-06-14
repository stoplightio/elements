import { withQueryClientProvider } from '@stoplight/elements-core';
import * as React from 'react';

export type DevPortalProviderProps = {
  platformUrl?: string;
  authToken?: string;
};

export const PlatformContext = React.createContext<DevPortalProviderProps>({ platformUrl: 'https://stoplight.io' });

const PlatformUrlProvider: React.FC<DevPortalProviderProps> = ({
  platformUrl = 'https://stoplight.io',
  authToken,
  children,
}) => {
  return <PlatformContext.Provider value={{ platformUrl, authToken }}>{children}</PlatformContext.Provider>;
};

export const DevPortalProvider = withQueryClientProvider(PlatformUrlProvider);
