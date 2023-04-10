import * as React from 'react';

import type { RouterType } from '../types';

export const RouterTypeContext = React.createContext<RouterType | null>(null);

export const useRouterType = () => {
  return React.useContext(RouterTypeContext);
};
