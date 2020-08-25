import '../styles/stoplight.scss';

import cn from 'classnames';
import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';

import Header from './header';

const Layout: React.FC<{ centered: boolean }> = ({ children, centered }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <div className="min-h-screen flex flex-col">
      <Header siteTitle={data.site.siteMetadata.title} centered={true} />

      <main
        className={cn('flex-1', {
          'mx-auto max-w-6xl p-10': centered,
        })}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
