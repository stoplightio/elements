import { faExclamationCircle, faEye, faLock } from '@fortawesome/free-solid-svg-icons';
import { Badge, Tooltip } from '@stoplight/mosaic';
import { HttpSecurityScheme } from '@stoplight/types';
import React from 'react';
import { Link } from 'react-router-dom';

import { badgeDefaultColor } from '../../../constants';
import { getReadableSecurityName } from '../../../utils/oas/security';

export const DeprecatedBadge: React.FC = () => (
  <Tooltip
    renderTrigger={
      <Badge intent="warning" icon={faExclamationCircle} data-testid="badge-deprecated">
        Deprecated
      </Badge>
    }
  >
    This operation has been marked as deprecated, which means it could be removed at some point in the future.
  </Tooltip>
);

export const InternalBadge: React.FC<{ isHttpService?: boolean }> = ({ isHttpService }) => (
  <Tooltip
    renderTrigger={
      <Badge icon={faEye} data-testid="badge-internal" className="sl-bg-danger sl-ml-0">
        Internal
      </Badge>
    }
  >
    {`This ${isHttpService ? 'operation' : 'model'} is marked as internal and won't be visible in public docs.`}
  </Tooltip>
);

export const SecurityBadge: React.FC<{ scheme: HttpSecurityScheme; httpServiceUri?: string }> = ({
  scheme,
  httpServiceUri,
}) => {
  const badge = (
    <Badge
      icon={faLock}
      data-testid="badge-security"
      className="sl-truncate"
      style={{ backgroundColor: badgeDefaultColor }}
    >
      {getReadableSecurityName(scheme, true)}
    </Badge>
  );

  return httpServiceUri ? (
    <Link to={`${httpServiceUri}?security=${scheme.key}`} className="sl-no-underline sl-block">
      {badge}
    </Link>
  ) : (
    badge
  );
};
