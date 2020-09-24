import * as PropTypes from 'prop-types';
import * as React from 'react';

import { getDisplayName } from './hoc/utils';

const scopeClassName = 'sl-elements';

export class Styled extends React.Component {
  // Unfortunately BP uses the Legacy Context API which can only be utilized via class components and PropTypes.
  static childContextTypes = {
    blueprintPortalClassName: PropTypes.string,
  };

  getChildContext() {
    return {
      blueprintPortalClassName: scopeClassName,
    };
  }

  render() {
    return <div className="sl-elements">{this.props.children}</div>;
  }
}

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
