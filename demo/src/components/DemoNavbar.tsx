import { Box, Button, Flex, HStack, Input, InvertTheme, Text } from '@stoplight/mosaic';
import React, { useContext, useState } from 'react';

import { DEFAULT_API_URL, GlobalContext } from '../context';

// https://stoplight.io/api/v1/projects/marbemac/studio-playground/nodes/reference/swagger-petstore/openapi.yaml?branch=master&deref=optimizedBundle
// style={{ backgroundColor: '#9a59ff' }}

export const DemoNavbar = () => {
  return (
    <>
      <InvertTheme>
        <Flex h="2xl" px={5} alignItems="center" bg="canvas-pure" pos="fixed" pinX zIndex={50}>
          <HStack flexGrow alignItems="center" spacing={4}>
            <Text fontSize="lg">Stoplight Elements Demo</Text>

            <Box style={{ height: 20 }}>
              <a
                className="github-button"
                href="https://github.com/ntkme/github-buttons"
                data-color-scheme="no-preference: light; light: light; dark: light;"
                // data-size="large"
                data-show-count="true"
                aria-label="Star ntkme/github-buttons on GitHub"
              >
                Star
              </a>
            </Box>
          </HStack>

          <Flex flexGrow justifyContent="center">
            <SpecUrlInput />
          </Flex>

          <HStack flexGrow justifyContent="end" spacing={2}>
            <Button as="a" appearance="minimal" target="__blank" href="https://stoplight.io">
              Stoplight
            </Button>
            {/* <Button appearance="minimal">Documentation</Button> */}
          </HStack>
        </Flex>
      </InvertTheme>

      {/* spacer */}
      <Box h="2xl" />
    </>
  );
};

const SpecUrlInput = () => {
  const { setDescriptionUrl } = useContext(GlobalContext);
  const [value, setValue] = useState('');

  return (
    <HStack spacing={2} flexGrow>
      <Input
        appearance="minimal"
        placeholder="URL to an OpenAPI spec to try..."
        flexGrow
        bg="canvas-100"
        rounded
        value={value}
        onChange={e => {
          setValue(e.currentTarget.value);
        }}
        onBlur={() => {
          if (!value.trim()) {
            setDescriptionUrl(DEFAULT_API_URL);
          }
        }}
      />

      <Button onClick={() => setDescriptionUrl(value)}>Try It!</Button>
    </HStack>
  );
};
