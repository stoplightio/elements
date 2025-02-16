import { DefaultComponentMapping } from '@stoplight/markdown-viewer';
import * as React from 'react';
import { Route, Routes, useInRouterContext } from 'react-router-dom';

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

const InternalRoutes = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <MarkdownComponentsProvider value={components}>
            <ScrollToHashElement />
            {children}
          </MarkdownComponentsProvider>
        }
      />
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
