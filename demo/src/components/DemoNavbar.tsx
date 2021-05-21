import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  InvertTheme,
  Menu,
  MenuOption,
  MenuRadioGroup,
  Text,
} from '@stoplight/mosaic';
import React, { useContext, useState } from 'react';

import { DEFAULT_API_URL, EXAMPLE_SPECS } from '../constants';
import { GlobalContext } from '../context';

export const DemoNavbar = () => {
  return (
    <>
      <InvertTheme>
        <Flex h="2xl" shrink={0} px={5} alignItems="center" bg="canvas-pure">
          <HStack w="1/3" alignItems="center" spacing={4}>
            <Text fontSize="lg" fontWeight="semibold" lineHeight="none">
              Stoplight Elements Demo
            </Text>

            <Box style={{ height: 28 }}>
              <a
                className="github-button"
                href="https://github.com/stoplightio/elements"
                data-color-scheme="no-preference: light; light: light; dark: light;"
                data-size="large"
                data-show-count="true"
                aria-label="Star stoplightio/elements on GitHub"
              >
                Star
              </a>
            </Box>
          </HStack>

          <Flex w="1/3" justifyContent="center">
            <SpecUrlInput />
          </Flex>

          <HStack w="1/3" flex={1} justifyContent="end">
            <Button as="a" appearance="minimal" target="__blank" href="https://stoplight.io">
              Stoplight
            </Button>
          </HStack>
        </Flex>
      </InvertTheme>
    </>
  );
};

const SpecUrlInput = () => {
  const { apiDescriptionUrl, setDescriptionUrl } = useContext(GlobalContext);
  const [value, setValue] = useState('');

  React.useEffect(() => {
    setValue(apiDescriptionUrl !== DEFAULT_API_URL ? apiDescriptionUrl : '');
  }, [apiDescriptionUrl]);

  return (
    <HStack spacing={2} flex={1}>
      <Input
        appearance="minimal"
        placeholder="URL to an OpenAPI document..."
        flex={1}
        bg="canvas-100"
        rounded
        value={value}
        onKeyUp={e => {
          if (e.key === 'Enter') {
            setDescriptionUrl(value);
          }
        }}
        onChange={e => {
          setValue(e.currentTarget.value);
        }}
        onBlur={() => {
          if (!value.trim() && apiDescriptionUrl !== DEFAULT_API_URL) {
            setDescriptionUrl(DEFAULT_API_URL);
          }
        }}
      />

      <Button onClick={() => setDescriptionUrl(value)}>Try It!</Button>

      <Text color="light" px={2}>
        or
      </Text>

      <ExamplePicker />
    </HStack>
  );
};

const ExamplePicker = () => {
  const { apiDescriptionUrl, setDescriptionUrl } = useContext(GlobalContext);

  return (
    <Menu trigger={<Button iconRight={['fas', 'caret-down']}>Pick an Example</Button>}>
      <MenuRadioGroup value={apiDescriptionUrl} onChange={setDescriptionUrl}>
        {EXAMPLE_SPECS.map((s, i) => (
          <MenuOption key={i} text={s.text} value={s.value} />
        ))}
      </MenuRadioGroup>
    </Menu>
  );
};
