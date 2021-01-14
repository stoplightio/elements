import { ILink } from '@stoplight/markdown';
import { MarkdownComponent } from '@stoplight/markdown-viewer';
import * as React from 'react';
import { Route } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import { ComponentsProvider } from '../context/Components';
import { useRouter } from '../hooks/useRouter';
import { RoutingProps } from '../types';
import { getDisplayName } from './utils';

export function withRouter<P extends RoutingProps>(WrappedComponent: React.ComponentType<P>): React.FC<P> {
  const WithRouter = (props: P) => {
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

const externalRegex = new RegExp('^(?:[a-z]+:)?//', 'i');

const ReactRouterMarkdownLink: MarkdownComponent<ILink> = ({ node: { url, title }, children }) => {
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
