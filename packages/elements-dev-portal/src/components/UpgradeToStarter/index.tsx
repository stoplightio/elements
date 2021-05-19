import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { Box, Flex, Icon } from '@stoplight/mosaic';
import React from 'react';

export const UpgradeToStarter = () => (
  <Flex
    as="a"
    href="https://stoplight.io/pricing/"
    target="_blank"
    rel="noreferrer noopener"
    justify="center"
    alignItems="center"
    w="full"
    minH="screen"
    color="muted"
    flexDirection="col"
  >
    <Icon icon={faExclamationTriangle} size="4x" />
    <Box pt={3}>
      Please upgrade your Stoplight Workspace to the Starter Plan to use Elements Dev Portal in production.
    </Box>
  </Flex>
);
