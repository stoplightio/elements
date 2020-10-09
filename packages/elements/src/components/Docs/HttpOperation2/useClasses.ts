import * as React from 'react';

import { IMagicNode } from '../../../AST/basics';
import { EnhancerContext } from './EnhancerContext';

export function useClasses<T extends IMagicNode>(data?: T) {
  const Enhancer = React.useContext(EnhancerContext);
  if (!data) return {};
  return Enhancer.getClasses(data.id);
}
