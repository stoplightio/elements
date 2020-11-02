import { faExclamationCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Position, Tag, Tooltip } from '@stoplight/ui-kit';
import cs from 'classnames';
import React from 'react';

export const Badge: React.FC<{
  icon?: IconDefinition;
  className?: string;
  tooltip?: string;
}> = ({ icon, className, children, tooltip }) => (
  <Tooltip position={Position.BOTTOM_RIGHT} content={tooltip}>
    <Tag className={cs('text-md p-1 font-semibold mt-1', className)} round>
      {icon && <FontAwesomeIcon className="mr-2" icon={icon} />}
      <span>{children}</span>
    </Tag>
  </Tooltip>
);

export const DeprecatedBadge: React.FC = () => (
  <Badge
    icon={faExclamationCircle}
    className="bg-orange-6"
    tooltip="This operation has been marked as deprecated, which means it could be removed at some point in the future."
  >
    Deprecated
  </Badge>
);
