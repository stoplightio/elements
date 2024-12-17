import { Dictionary } from '@stoplight/types';
import * as React from 'react';
import { BrowserRouter, HashRouter, MemoryRouter } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server.js';

import { RouterType } from '../types';

const RouterComponent: Dictionary<React.ComponentType, RouterType> = {
  history: BrowserRouter,
  memory: MemoryRouter,
  hash: HashRouter,
  static: StaticRouter as any,
};

interface RouterProps {
  basename?: string;
  location?: string;
}

export const useRouter = (router: RouterType, basePath: string, staticRouterPath?: string) => {
  const Router = RouterComponent[router];
  const routerProps: RouterProps = {
    ...(router !== 'memory' && { basename: basePath }),
    ...(router === 'static' && { location: staticRouterPath }),
  };

  return {
    Router,
    routerProps,
  };
};
