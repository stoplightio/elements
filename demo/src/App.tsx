import { Flex, useIconStore } from '@stoplight/mosaic';
import React from 'react';

import { DemoNavbar } from './components/DemoNavbar';
import { ElementsAPI } from './components/ElementsAPI';

export function App() {
  const setDefaultStyle = useIconStore(state => state.setDefaultStyle);

  React.useEffect(() => {
    setDefaultStyle('fal');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex
      direction="col"
      bg="canvas"
      minH="screen"
      fontFamily="ui"
      fontSize="base"
      color="body"
      className="sl-antialiased"
    >
      <DemoNavbar />
      <ElementsAPI />
    </Flex>
  );
}
