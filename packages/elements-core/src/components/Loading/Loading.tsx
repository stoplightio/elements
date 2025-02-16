import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { Flex, Icon } from '@stoplight/mosaic';
import React from 'react';

export const Loading = () => (
  <Flex justify="center" alignItems="center" w="full" minH="screen" color="muted">
    <Icon icon={faCircleNotch} size="3x" spin />
  </Flex>
);
