import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

export type ProviderProps = {
  platformUrl?: string;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
    },
  },
});

export const PlatformUrlContext = React.createContext('https://stoplight.io');

export const Provider: React.FC<ProviderProps> = ({ platformUrl = 'https://stoplight.io', children }) => {
  return (
    <PlatformUrlContext.Provider value={platformUrl}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </PlatformUrlContext.Provider>
  );
};
