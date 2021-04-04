import { Flex, useIconStore } from '@stoplight/mosaic';
import React, { useState } from 'react';

import { DemoNavbar } from './components/DemoNavbar';
import { ElementsAPI } from './components/ElementsAPI';
import { DEFAULT_API_URL, GlobalContext } from './context';

export function App() {
  const setDefaultStyle = useIconStore(state => state.setDefaultStyle);

  React.useEffect(() => {
    setDefaultStyle('fal');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [globalState, setGlobalState] = useState<GlobalContext>({
    apiDescriptionUrl: DEFAULT_API_URL,
    setDescriptionUrl: value => {
      setGlobalState({
        ...globalState,
        apiDescriptionUrl: value,
      });
    },
  });

  return (
    <GlobalContext.Provider value={globalState}>
      <Flex
        direction="col"
        bg="canvas"
        minH="screen"
        fontFamily="ui"
        fontSize="base"
        color="body"
        className="sl-antialiased"
        lineHeight="none"
      >
        <DemoNavbar />
        <ElementsAPI />
      </Flex>
    </GlobalContext.Provider>
  );
}
