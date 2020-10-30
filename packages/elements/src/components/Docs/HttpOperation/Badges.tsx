import { faExclamationCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tag } from '@stoplight/ui-kit';
import cs from 'classnames';
import React from 'react';

export const Badge: React.FC<{
  icon?: IconDefinition;
  className?: string;
}> = ({ icon, className, children }) => (
  <Tag className={cs('text-md p-1 font-semibold mt-1', className)} round>
    {icon && <FontAwesomeIcon className="mr-2" icon={icon} />}
    <span>{children}</span>
  </Tag>
);

export const DeprecatedBadge: React.FC = () => (
  <Badge icon={faExclamationCircle} className="bg-orange-6">
    Deprecated
  </Badge>
);
