import { Box } from '@stoplight/mosaic';
import * as React from 'react';

import { getDisplayName } from './hoc/utils';

export const Styled = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box className="sl-elements sl-antialiased" fontFamily="ui" fontSize="base" color="body" h="full">
      {children}
    </Box>
  );
};

export function withStyles<T>(Component: React.ComponentType<T>): React.FC<T> {
  const Inner: React.FC<T> = props => (
    <Styled>
      <Component {...props} />
    </Styled>
  );
  Inner.displayName = `withStyles(${getDisplayName(Component)})`;
  return Inner;
}
