import { Box, Flex, Heading, VStack } from '@stoplight/mosaic';
import React from 'react';

export const Forbidden = () => (
  <Flex align="center" justify="center" flexGrow>
    <VStack spacing={4} align="center">
      <Heading size={1}>Forbidden</Heading>
      <Box as="p">You don't have permission to access this resource</Box>
    </VStack>
  </Flex>
);
