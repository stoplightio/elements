import { Box, Button, Flex, InvertTheme } from '@stoplight/mosaic';
import React from 'react';

export const DemoNavbar = () => {
  return (
    <InvertTheme>
      <Flex style={{ backgroundColor: '#9a59ff' }} h="xl" px={5} alignItems="center">
        <Box flexGrow>Stoplight Elements Demo</Box>

        <Flex flexGrow justifyContent="center">
          Example Specs: ...TODO
        </Flex>

        <Flex flexGrow justifyContent="end">
          <Button size="sm" appearance="minimal">
            Right Links
          </Button>
        </Flex>
      </Flex>
    </InvertTheme>
  );
};
