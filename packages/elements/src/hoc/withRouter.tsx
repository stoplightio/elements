import { ILink } from '@stoplight/markdown';
import { MarkdownComponent } from '@stoplight/markdown-viewer';
import * as React from 'react';
import { Link, Route } from 'react-router-dom';

import { ComponentsProvider } from '../context/Components';
import { useRouter } from '../hooks/useRouter';
import { RoutingProps } from '../types';
import { getDisplayName } from './utils';

export function withRouter<T>(
  WrappedComponent: React.ComponentType<T & RoutingProps>,
): React.ComponentType<T & RoutingProps> {
  const WithRouter = (props: T & RoutingProps) => {
    const { Router, routerProps } = useRouter(props.router ?? 'history', props.basePath ?? '/');
    return (
      <Router {...routerProps}>
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

const ReactRouterMarkdownLink: MarkdownComponent<ILink> = ({ node: { url, title }, children }) => {
  return (
    <Link to={url} title={title}>
      {children}
    </Link>
  );
};
