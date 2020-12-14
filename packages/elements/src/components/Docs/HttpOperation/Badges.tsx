import { faExclamationCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Position, Tag, Tooltip } from '@stoplight/ui-kit';
import cs from 'classnames';
import React from 'react';

export const Badge: React.FC<{
  icon?: IconDefinition;
  className?: string;
}> = ({ icon, className, children, ...rest }) => (
  <Tag role="badge" className={cs('text-md p-1 font-semibold mt-1', className)} round {...rest}>
    {icon && <FontAwesomeIcon className="mr-2" icon={icon} />}
    <span>{children}</span>
  </Tag>
);
export const DeprecatedBadge: React.FC = () => (
  <Tooltip
    position={Position.BOTTOM_RIGHT}
    content="This operation has been marked as deprecated, which means it could be removed at some point in the future."
  >
    <Badge icon={faExclamationCircle} className="bg-orange-6" data-testid="deprecated-badge">
      Deprecated
    </Badge>
  </Tooltip>
);
