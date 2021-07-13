import { Box, Flex } from '@stoplight/mosaic';
import React from 'react';

export interface TwoColumnLayoutProps {
  header: React.ReactNode;
  right: React.ReactNode;
  left: React.ReactNode;
  className?: string;
}

export const TwoColumnLayout = ({ header, right, left, className }: TwoColumnLayoutProps) => (
  <Box w="full" className={className}>
    {header}
    <Flex mt={header ? 12 : undefined}>
      <Box style={{ width: 0 }} flex={1}>
        {left}
      </Box>
      {right && (
        <Box ml={16} pos="relative" w="2/5" style={{ maxWidth: 500 }}>
          {right}
        </Box>
      )}
    </Flex>
  </Box>
);
