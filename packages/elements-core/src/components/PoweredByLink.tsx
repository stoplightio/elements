import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Flex } from '@stoplight/mosaic';
import * as React from 'react';

export const PoweredByLink: React.FC<{
  source: string;
  pathname: string;
  packageType: 'elements' | 'elements-dev-portal';
  layout?: 'sidebar' | 'stacked';
}> = ({ source, pathname, packageType, layout = 'sidebar' }) => {
  return (
    <Flex
      as="a"
      align="center"
      borderT={layout === 'stacked' ? undefined : true}
      px={layout === 'stacked' ? 1 : 4}
      py={3}
      justify={layout === 'stacked' ? 'end' : undefined}
      href={`https://stoplight.io/?utm_source=${packageType}&utm_medium=${source}&utm_campaign=powered_by&utm_content=${pathname}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon icon={faBolt} className="sl-mr-1 fa-fw" style={{ color: 'rgba(144, 97, 249, 1)' }} />
      <div>
        powered by&nbsp;<strong>Stoplight</strong>
      </div>
    </Flex>
  );
};
