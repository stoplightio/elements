import './header.css';

import { Link } from 'gatsby';
import React from 'react';

const Header = () => {
  return (
    <header className="Header">
      <Link to="/" className="Header__link">
        <img src="https://s3.amazonaws.com/totem_production/assets/logos/10719/original/logo_light_bg.png?1501094221" />
      </Link>

      <Link to="/elements" className="Header__link" activeClassName="Header__link--active">
        Docs
      </Link>

      <Link to="/zoom-api/" className="Header__link" activeClassName="Header__link--active">
        Zoom API
      </Link>
    </header>
  );
};

export default Header;
