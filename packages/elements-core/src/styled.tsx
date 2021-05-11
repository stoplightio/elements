import { Box } from '@stoplight/mosaic';
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
    return (
      <Box className="sl-elements sl-antialiased" fontFamily="ui" fontSize="base" color="body" h="full">
        {this.props.children}
      </Box>
    );
  }
}

export function withStyles<T>(Component: React.ComponentType<T>): React.FC<T> {
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
