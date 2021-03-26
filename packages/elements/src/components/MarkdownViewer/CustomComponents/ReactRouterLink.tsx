import { ILink } from '@stoplight/markdown';
import { MarkdownComponent } from '@stoplight/markdown-viewer';
import React from 'react';
import { HashLink } from 'react-router-hash-link';

const externalRegex = new RegExp('^(?:[a-z]+:)?//', 'i');

export const ReactRouterMarkdownLink: MarkdownComponent<ILink> = ({ node: { url, title }, children }) => {
  const isExternal = externalRegex.test(url);
  if (isExternal) {
    return (
      <a target="_blank" rel="noreferrer noopener" href={url} title={title}>
        {children}
      </a>
    );
  }
  return (
    <HashLink to={url} title={title}>
      {children}
    </HashLink>
  );
};
