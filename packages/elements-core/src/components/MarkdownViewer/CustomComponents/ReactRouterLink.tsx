import { CustomComponentMapping } from '@stoplight/markdown-viewer';
import React from 'react';
import { HashLink } from 'react-router-hash-link';

const externalRegex = new RegExp('^(?:[a-z]+:)?//', 'i');

export const ReactRouterMarkdownLink: CustomComponentMapping['a'] = ({ href, title, children }) => {
  if (!href) return null;

  const isExternal = externalRegex.test(href);
  if (isExternal) {
    return (
      <a target="_blank" rel="noreferrer noopener" href={href} title={title}>
        {children}
      </a>
    );
  }
  return (
    <HashLink to={href} title={title}>
      {children}
    </HashLink>
  );
};
