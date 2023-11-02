import type { LinkProps } from '@stoplight/mosaic';
import React from 'react';
import { useHref } from 'react-router-dom';

const externalRegex = new RegExp('^(?:[a-z]+:)?//', 'i');

export const ReactRouterMarkdownLink = ({
  title,
  to,
  href: _href,
  children,
}: Omit<LinkProps, 'target' | 'rel'> & {
  to?: string | Partial<{ pathname: string; search: string; hash: string }>;
}) => {
  const useHrefRes = useHref(to || '');
  const href = to ? useHrefRes : _href;

  const isExternal = href !== undefined && externalRegex.test(href);
  if (isExternal) {
    return (
      <a target="_blank" rel="noreferrer noopener" href={href} title={title}>
        {children}
      </a>
    );
  }
  return (
    <a href={href} title={title}>
      {children}
    </a>
  );
};
