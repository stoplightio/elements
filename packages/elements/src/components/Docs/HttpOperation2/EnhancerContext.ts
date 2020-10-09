import * as React from 'react';

export const EnhancerContext = React.createContext({
  getClasses: (id: string) => ({}),
  onClick: (e: React.MouseEvent, id: string) => void 0,
});
