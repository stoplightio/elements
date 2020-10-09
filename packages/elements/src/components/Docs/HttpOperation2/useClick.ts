import * as React from 'react';

import { IMagicNode } from '../../../AST/basics';
import { EnhancerContext } from './EnhancerContext';

export function useClick<T extends IMagicNode>(data?: T) {
  const Enhancer = React.useContext(EnhancerContext);
  if (!data) return () => void 0;
  return (e: React.MouseEvent) => Enhancer.onClick(e, data.id);
}
