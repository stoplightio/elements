import { Box, Flex, Heading, VStack } from '@stoplight/mosaic';
import React from 'react';

export const NotFound = () => (
  <Flex align="center" justify="center" flexGrow>
    <VStack spacing={4} align="center">
      <Heading size={1}>Not Found</Heading>
      <Box as="p">Could not find what you are looking for</Box>
    </VStack>
  </Flex>
);
