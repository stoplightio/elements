import { faExclamationCircle, faEye, faLock, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HttpSecurityScheme } from '@stoplight/types';
import { Position, Tag, Tooltip } from '@stoplight/ui-kit';
import cs from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

import { getReadableSecurityName } from '../../../utils/oas/security';

export const Badge: React.FC<{
  icon?: IconDefinition;
  className?: string;
  children: string;
}> = ({ icon, className, children }) => (
  <Tag
    role="badge"
    className={cs('sl-text-md p-1 sl-font-semibold sl-mt-1 sl-mr-1', className)}
    round
    aria-label={children}
  >
    <span className="flex items-center">
      {icon && <FontAwesomeIcon className="mr-2" icon={icon} />}
      {children}
    </span>
  </Tag>
);
export const DeprecatedBadge: React.FC = () => (
  <Tooltip
    position={Position.BOTTOM_LEFT}
    content="This operation has been marked as deprecated, which means it could be removed at some point in the future."
  >
    <Badge icon={faExclamationCircle} className="sl-bg-warning sl-ml-0">
      Deprecated
    </Badge>
  </Tooltip>
);

export const InternalBadge: React.FC<{ isHttpService?: boolean }> = ({ isHttpService }) => (
  <Tooltip
    position={Position.BOTTOM_LEFT}
    content={`This ${isHttpService ? 'operation' : 'model'} is marked as internal and won't be visible in public docs.`}
  >
    <Badge icon={faEye} className="sl-bg-danger sl-ml-0 ">
      Internal
    </Badge>
  </Tooltip>
);

export const SecurityBadge: React.FC<{ scheme: HttpSecurityScheme; httpServiceUri?: string }> = ({
  scheme,
  httpServiceUri,
}) => {
  const badge = (
    <Badge icon={faLock} className="sl-bg-gray-6 sl-max-w-xs sl-truncate">
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
