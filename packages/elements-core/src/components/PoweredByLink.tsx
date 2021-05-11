import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

export const PoweredByLink: React.FC<{
  headless?: boolean;
  source: string;
  pathname: string;
  packageType: 'elements' | 'elements-dev-portal';
}> = ({ headless, source, pathname, packageType }) => {
  return (
    <a
      className={
        !headless ? 'border-t flex items-center px-5 py-3 reset' : 'flex items-center px-1 py-3 reset justify-end'
      }
      href={`https://stoplight.io/?utm_source=elements${
        packageType === 'elements-dev-portal' ? '-dev-portal' : ''
      }&utm_medium=${source}&utm_campaign=powered_by&utm_content=${pathname}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon
        icon={faBolt}
        className={!headless ? 'mr-1 fa-fw' : 'mr-1 fa-fw'}
        style={{ color: 'rgba(144, 97, 249, 1)' }}
      />
      <div>
        powered by&nbsp;<strong>Stoplight</strong>
      </div>
    </a>
  );
};
