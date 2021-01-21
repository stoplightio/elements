import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navigation = () => {
  return (
    <div className="topnav">
      <NavLink to="/stoplight-project">Stoplight Project demo</NavLink>
      <NavLink to="/stoplight-api">Zoom API</NavLink>
    </div>
  );
};
