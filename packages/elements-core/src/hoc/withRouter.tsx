import { DefaultComponentMapping } from '@stoplight/markdown-viewer';
import * as React from 'react';
import { Route, Routes, useInRouterContext } from 'react-router';

import { LinkHeading } from '../components/LinkHeading';
import { MarkdownComponentsProvider } from '../components/MarkdownViewer/CustomComponents/Provider';
import { ReactRouterMarkdownLink } from '../components/MarkdownViewer/CustomComponents/ReactRouterLink';
import { ScrollToHashElement } from '../components/MarkdownViewer/CustomComponents/ScrollToHashElement';
import { RouterTypeContext } from '../context/RouterType';
import { useRouter } from '../hooks/useRouter';
import { RoutingProps } from '../types';
import { getDisplayName } from './utils';

const components: Partial<DefaultComponentMapping> = {
  a: ReactRouterMarkdownLink,
  h2: ({ color, ...props }) => <LinkHeading size={2} {...props} />,
  h3: ({ color, ...props }) => <LinkHeading size={3} {...props} />,
  h4: ({ color, ...props }) => <LinkHeading size={4} {...props} />,
};

const InternalRoutes = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  // The content is rendered by a route that does not end in a splat, with the splat as its child. Relative links
  // (such as the ones in the table of contents) resolve against the route they are rendered in, and from a route
  // that ends in a splat React Router 7+ includes the part of the URL the splat matched. That would append every
  // link to the current page: from `/api/operations/a` a link to `operations/b` would lead to
  // `/api/operations/a/operations/b` instead of `/api/operations/b`.
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MarkdownComponentsProvider value={components}>
            <ScrollToHashElement />
            {children}
          </MarkdownComponentsProvider>
        }
      >
        <Route path="*" element={null} />
      </Route>
    </Routes>
  );
};

export function withRouter<P extends RoutingProps>(
  WrappedComponent: React.ComponentType<P & { outerRouter?: boolean }>,
): React.FC<P> {
  const WithRouter = (props: P) => {
    const outerRouter = useInRouterContext();
    const basePath = props.basePath ?? '/';
    const staticRouterPath = props.staticRouterPath ?? '';
    const routerType = props.router ?? 'history';
    const { Router, routerProps } = useRouter(routerType, basePath, staticRouterPath);

    if (!outerRouter) {
      return (
        <RouterTypeContext.Provider value={routerType}>
          <Router {...routerProps} key={basePath}>
            <InternalRoutes>
              <WrappedComponent {...props} outerRouter={false} />
            </InternalRoutes>
          </Router>
        </RouterTypeContext.Provider>
      );
    }

    return (
      <RouterTypeContext.Provider value={routerType}>
        <InternalRoutes>
          <WrappedComponent {...props} outerRouter />
        </InternalRoutes>
      </RouterTypeContext.Provider>
    );
  };

  WithRouter.displayName = `WithRouter(${getDisplayName(WrappedComponent)})`;

  return WithRouter;
}
