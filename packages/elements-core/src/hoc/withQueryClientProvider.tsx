import React from 'react';
import { QueryClient, QueryClientProvider, useQueryClient } from 'react-query';

import { getDisplayName } from './utils';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 15 * 1000,
    },
  },
});

export function withQueryClientProvider<P>(WrappedComponent: React.ComponentType<P>): React.FC<P> {
  const WithQueryClientProvider = (props: P) => {
    try {
      // if already have query client in tree, use it rather than creating a new provider
      useQueryClient();
      return <WrappedComponent {...props} />;
    } catch {
      // no query client yet in the tree (if `useQueryClient` throws)
    }

    return (
      <QueryClientProvider client={queryClient}>
        <WrappedComponent {...props} />
      </QueryClientProvider>
    );
  };

  WithQueryClientProvider.displayName = `WithQueryClientProvider(${getDisplayName(WrappedComponent)})`;

  return WithQueryClientProvider;
}
