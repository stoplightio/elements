import { Provider } from '@stoplight/mosaic';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NavLink } from 'react-router-dom';

import { Search } from './Search';

export const Navigation = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 15 * 1000,
      },
    },
  });
  return (
    <nav className="topnav">
      <NavLink to="/stoplight-project">Stoplight Project</NavLink>
      <NavLink to="/zoom-api">Zoom API</NavLink>
      <Provider>
        <QueryClientProvider client={queryClient}>
          <Search renderTrigger={({ open }: any) => <input onClick={open} placeholder="Search..." />} />
        </QueryClientProvider>
      </Provider>
    </nav>
  );
};
