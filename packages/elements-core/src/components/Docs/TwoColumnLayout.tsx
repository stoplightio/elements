import { Box, Flex, VStack } from '@stoplight/mosaic';
import React from 'react';

export interface TwoColumnLayoutProps {
  header: React.ReactNode;
  right: React.ReactNode;
  left: React.ReactNode;
  className?: string;
}

export const TwoColumnLayout = ({ header, right, left, className }: TwoColumnLayoutProps) => (
  <VStack w="full" className={className} spacing={8}>
    {header}
    <Flex>
      <Box w={0} flex={1}>
        {left}
      </Box>

      {right && (
        <Box ml={16} pos="relative" w="2/5" style={{ maxWidth: 500 }}>
          {right}
        </Box>
      )}
    </Flex>
  </VStack>
);
