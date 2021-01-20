import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navigation = () => {
  return (
    <div className="topnav">
      <NavLink to="/stoplight-project">Stoplight Project</NavLink>
      <NavLink to="/stoplight-api">Stoplight API</NavLink>
    </div>
  );
};
