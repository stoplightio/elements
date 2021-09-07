import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NavLink } from 'react-router-dom';

import { Search } from './Search';

export const Navigation = () => {
  const queryClient = new QueryClient();

  return (
    <nav className="topnav">
      <NavLink to="/stoplight-project">Stoplight Project</NavLink>
      <NavLink to="/zoom-api">Zoom API</NavLink>
      <QueryClientProvider client={queryClient}>
        <Search projectIds={['cHJqOjYwNjYx']} workspaceId="d2s6NDE1NTU" />
      </QueryClientProvider>
    </nav>
  );
};
