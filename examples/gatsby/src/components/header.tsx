import cn from 'classnames';
import { Link } from 'gatsby';
import React from 'react';

import Image from './image';

const Header = ({ centered }: { siteTitle: string; centered: boolean }) => {
  return (
    <>
      <header>
        <div
          className={cn('flex items-baseline text-center', {
            'max-w-6xl mx-auto': centered,
          })}
        >
          <div
            className={cn('flex items-baseline py-8', {
              'max-w-6xl mx-auto': centered,
              'px-10': !centered,
            })}
          >
            <Link to="/" className="reset mr-10">
              <div style={{ transform: 'translateY(25%)' }}>
                <Image />
              </div>
            </Link>

            <Link to="/stoplight-project/" className="reset mr-6 text-lg">
              <span>Stoplight Project</span>
            </Link>

            <Link to="/api/" className="reset mr-6 text-lg">
              <span>API</span>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
