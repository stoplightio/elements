import './layout.css';

import React from 'react';

import Header from './header';

require('@stoplight/elements/styles.min.css');

const Layout = ({ children }) => {
  return (
    <div className="Layout">
      <Header />

      <main className="MainContent">{children}</main>
    </div>
  );
};

export default Layout;
