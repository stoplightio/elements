import type { LinkProps } from '@stoplight/mosaic';
import { HashLink } from '@xzar90/react-router-hash-link';
import React from 'react';

const externalRegex = new RegExp('^(?:[a-z]+:)?//', 'i');

export const ReactRouterMarkdownLink = ({
  title,
  to,
  href: _href,
  children,
}: Omit<LinkProps, 'target' | 'rel'> & { to?: string; children?: React.ReactNode }) => {
  const href = to || _href;

  const isExternal = href !== undefined && externalRegex.test(href);
  if (isExternal) {
    return (
      <a target="_blank" rel="noreferrer noopener" href={href} title={title}>
        {children}
      </a>
    );
  }
  return (
    <HashLink to={href!!} title={title}>
      {children}
    </HashLink>
  );
};
