import {HeightVals, Image, WidthVals, Box} from '@stoplight/mosaic';
import * as React from 'react';

interface LogoProps {
  logo: {
    altText: string;
    url?: string;
    backgroundColor?: string;
    href?: string;
  };
  h?: HeightVals;
  w?: WidthVals;
}

export const Logo: React.FC<LogoProps> = ({ logo , h, w}) => {
  return (
    <Box
      w="full"
      display="inline"
      rounded="lg"
      overflowY="hidden"
      overflowX="hidden"
      style={{ backgroundColor: logo.backgroundColor ?? 'transparent'}}
    >
      {logo.url && logo.href && (
        <a href={logo.href} target="_blank" rel="noopener noreferrer">
          <Image src={logo.url} h={h} w={w} alt={logo.altText} style={{ margin: 'auto'}} />
        </a>
      )}
      {logo.url && !logo.href && (
        <Image src={logo.url} h={h} w={w} alt={logo.altText} style={{ margin: 'auto'}} />
      )}
    </Box>
  );
};
