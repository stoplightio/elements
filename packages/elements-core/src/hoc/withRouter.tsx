import * as React from 'react';
import { Route } from 'react-router-dom';

import { MarkdownComponentsProvider } from '../components/MarkdownViewer/CustomComponents/Provider';
import { ReactRouterMarkdownLink } from '../components/MarkdownViewer/CustomComponents/ReactRouterLink';
import { useRouter } from '../hooks/useRouter';
import { RoutingProps } from '../types';
import { getDisplayName } from './utils';

export function withRouter<P extends RoutingProps>(WrappedComponent: React.ComponentType<P>): React.FC<P> {
  const WithRouter = (props: P) => {
    const basePath = props.basePath ?? '/';
    const staticRouterPath = props.staticRouterPath ?? '';
    const { Router, routerProps } = useRouter(props.router ?? 'history', basePath, staticRouterPath);
    return (
      <Router {...routerProps} key={basePath}>
        <Route path="/">
          <MarkdownComponentsProvider value={{ a: ReactRouterMarkdownLink }}>
            <WrappedComponent {...props} />
          </MarkdownComponentsProvider>
        </Route>
      </Router>
    );
  };

  WithRouter.displayName = `WithRouter(${getDisplayName(WrappedComponent)})`;

  return WithRouter;
}
