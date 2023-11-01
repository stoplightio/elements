import { DefaultComponentMapping } from '@stoplight/markdown-viewer';
import * as React from 'react';
import { CompatRoute, CompatRouter } from 'react-router-dom-v5-compat';

import { LinkHeading } from '../components/LinkHeading';
import { MarkdownComponentsProvider } from '../components/MarkdownViewer/CustomComponents/Provider';
import { ReactRouterMarkdownLink } from '../components/MarkdownViewer/CustomComponents/ReactRouterLink';
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

export function withRouter<P extends RoutingProps>(WrappedComponent: React.ComponentType<P>): React.FC<P> {
  const WithRouter = (props: P) => {
    const basePath = props.basePath ?? '/';
    const staticRouterPath = props.staticRouterPath ?? '';
    const routerType = props.router ?? 'history';
    const { Router, routerProps } = useRouter(routerType, basePath, staticRouterPath);

    return (
      <RouterTypeContext.Provider value={routerType}>
        <Router {...routerProps} key={basePath}>
          <CompatRouter>
            <CompatRoute path="/">
              <MarkdownComponentsProvider value={components}>
                <WrappedComponent {...props} />
              </MarkdownComponentsProvider>
            </CompatRoute>
          </CompatRouter>
        </Router>
      </RouterTypeContext.Provider>
    );
  };

  WithRouter.displayName = `WithRouter(${getDisplayName(WrappedComponent)})`;

  return WithRouter;
}
