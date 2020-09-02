import * as React from 'react';

import { getDisplayName } from './hoc/utils';

export const Styled: React.FC = ({ children }) => <div className="sl-elements">{children}</div>;

export function withStyles<T>(Component: React.ComponentType<T>): React.ComponentType<T> {
  const Inner: React.FC<T> = props => {
    return (
      <Styled>
        <Component {...props} />
      </Styled>
    );
  };
  Inner.displayName = `withStyles(${getDisplayName(Component)})`;

  return Inner;
}
