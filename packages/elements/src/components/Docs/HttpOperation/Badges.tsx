import { faExclamationCircle, faLock, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HttpSecurityScheme } from '@stoplight/types';
import { Position, Tag, Tooltip } from '@stoplight/ui-kit';
import cs from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

import { getReadableSecurityName } from './utils';

export const Badge: React.FC<{
  icon?: IconDefinition;
  className?: string;
  children: string;
}> = ({ icon, className, children }) => (
  <Tag role="badge" className={cs('text-md p-1 font-semibold mt-1', className)} round aria-label={children}>
    {icon && <FontAwesomeIcon className="mr-2" icon={icon} />}
    <span>{children}</span>
  </Tag>
);
export const DeprecatedBadge: React.FC = () => (
  <Tooltip
    position={Position.BOTTOM_RIGHT}
    content="This operation has been marked as deprecated, which means it could be removed at some point in the future."
  >
    <Badge icon={faExclamationCircle} className="bg-orange-6">
      Deprecated
    </Badge>
  </Tooltip>
);

export const SecurityBadge: React.FC<{ scheme: HttpSecurityScheme; httpServiceUri?: string }> = ({
  scheme,
  httpServiceUri,
}) => {
  const badge = (
    <Badge icon={faLock} className="bg-gray-6 mx-1 max-w-xs truncate">
      {getReadableSecurityName(scheme, true)}
    </Badge>
  );

  return httpServiceUri ? (
    <Link to={httpServiceUri} className="no-underline block">
      {badge}
    </Link>
  ) : (
    badge
  );
};
