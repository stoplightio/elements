import { Box, Flex, Icon } from '@stoplight/mosaic';
import React from 'react';

export const Loading = () => (
  <Flex justify="center" alignItems="center" w="full" minH="screen" color="muted">
    <Box as={Icon} icon={['fal', 'circle-notch']} size="3x" spin />
  </Flex>
);
