import { NavLink, useLocation } from 'react-router';

import { Search } from './Search';

export const Navigation = () => {
  return (
    <nav className="topnav">
      <NavLink to="/stoplight-project">Stoplight Project</NavLink>
      <NavLink to="/zoom-api">Zoom API</NavLink>
      <NavLink to="/proxied-api">Proxied API</NavLink>
      <Search projectIds={['cHJqOjYwNjYx']} />
      <HostLocation />
    </nav>
  );
};

// Used by the e2e tests: shows the location that this app's own router knows about. It only follows
// navigation inside Elements when Elements uses this router instead of creating a second one.
const HostLocation = () => {
  const { pathname } = useLocation();

  return (
    <span data-testid="host-location" hidden>
      {pathname}
    </span>
  );
};
