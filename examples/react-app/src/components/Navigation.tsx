import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navigation = () => {
  return (
    <div className="topnav">
      <NavLink to="/stoplightProject">Stoplight Project</NavLink>
      <NavLink to="/API">Stoplight API</NavLink>
    </div>
  );
};
