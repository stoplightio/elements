import { ILink } from '@stoplight/markdown';
import { MarkdownComponent } from '@stoplight/markdown-viewer';
import { dirname, resolve } from '@stoplight/path';
import * as React from 'react';
import { Link, Route, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import { ComponentsProvider } from '../context/Components';
import { useRouter } from '../hooks/useRouter';
import { RoutingProps } from '../types';
import { getDisplayName } from './utils';

export function withRouter<T>(
  WrappedComponent: React.ComponentType<T & RoutingProps>,
): React.ComponentType<T & RoutingProps> {
  const WithRouter = (props: T & RoutingProps) => {
    const basePath = props.basePath ?? '/';
    const { Router, routerProps } = useRouter(props.router ?? 'history', basePath);
    return (
      <Router {...routerProps} key={basePath}>
        <Route path="/">
          <ComponentsProvider value={{ link: ReactRouterMarkdownLink }}>
            <WrappedComponent {...props} />
          </ComponentsProvider>
        </Route>
      </Router>
    );
  };

  WithRouter.displayName = `WithRouter(${getDisplayName(WrappedComponent)})`;

  return WithRouter;
}

const externalLinkRegex = new RegExp('^(?:[a-z]+:)?//', 'i');
const hashLinkRegex = new RegExp('^#');

const ReactRouterMarkdownLink: MarkdownComponent<ILink> = ({ node: { url, title }, children }) => {
  const location = useLocation();

  const isHashLink = hashLinkRegex.test(url);
  if (isHashLink) {
    return (
      <HashLink to={url} title={title}>
        {children}
      </HashLink>
    );
  }

  const isExternalLink = externalLinkRegex.test(url);
  if (isExternalLink) {
    return (
      <a target="_blank" rel="noreferrer noopener" href={url} title={title}>
        {children}
      </a>
    );
  }

  // Resolve relative node uris
  const resolvedUri = resolve(dirname(location.pathname), url);

  return (
    <Link to={resolvedUri} title={title}>
      {children}
    </Link>
  );
};
