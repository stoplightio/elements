import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { getDisplayName } from './utils';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  },
});

export function withQueryClientProvider<P>(WrappedComponent: React.ComponentType<P>): React.FC<P> {
  const WithQueryClientProvider = (props: P) => {
    return (
      <QueryClientProvider client={queryClient}>
        <WrappedComponent {...props} />
      </QueryClientProvider>
    );
  };

  WithQueryClientProvider.displayName = `WithQueryClientProvider(${getDisplayName(WrappedComponent)})`;

  return WithQueryClientProvider;
}
