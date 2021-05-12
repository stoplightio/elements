import { Box } from '@stoplight/mosaic';
import * as React from 'react';

interface LogoProps {
  logo: {
    altText: string;
    url?: string;
    backgroundColor?: string;
    href?: string;
  };
}

export const Logo: React.FC<LogoProps> = ({ logo }) => {
  return (
    <Box
      display="inline"
      mr={3}
      rounded="lg"
      overflowY="hidden"
      overflowX="hidden"
      style={{ backgroundColor: logo.backgroundColor ?? 'transparent' }}
    >
      {logo.href ? (
        <a href={logo.href} target="_blank" rel="noopener noreferrer">
          <img src={logo.url} height="30px" width="30px" alt={logo.altText} />
        </a>
      ) : (
        <img src={logo.url} height="30px" width="30px" alt={logo.altText} />
      )}
    </Box>
  );
};
