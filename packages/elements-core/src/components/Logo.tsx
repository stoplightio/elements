import { Box } from '@stoplight/mosaic';
import * as React from 'react';

import { LogoProps } from '../types';

export const Logo: React.FC<{ logo: LogoProps }> = ({ logo }) => {
  return (
    <Box
      display="inline"
      mr={3}
      rounded="none"
      overflowY="hidden"
      overflowX="hidden"
      style={{ backgroundColor: logo.backgroundColor ?? 'transparent' }}
    >
      {logo.href ? (
        <a href={logo.href} target="_blank" rel="noopener noreferrer">
          <img src={logo.url} width="240" height="100" alt={logo.altText} />
        </a>
      ) : (
        <img src={logo.url} width="240" height="100" alt={logo.altText} />
      )}
    </Box>
  );
};
