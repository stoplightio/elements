import React from 'react';
 
import { NavLink } from 'react-router-dom';
 
const Navigation = () => {
    return (
       <div className="topnav">
          <NavLink to="/">Stoplight Project</NavLink>
          <NavLink to="/stoplightAPI">Stoplight API</NavLink>
       </div>
    );
}
 
export default Navigation;