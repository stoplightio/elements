import { Flex, Provider as MosaicProvider, useIconStore } from '@stoplight/mosaic';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { DemoNavbar } from './components/DemoNavbar';
import { ElementsAPI } from './components/ElementsAPI';
import { DEFAULT_API_URL } from './constants';
import { GlobalContext } from './context';

export function App() {
  const { search } = useLocation();
  const searchParams = React.useMemo(() => new URLSearchParams(search), [search]);
  const setDefaultStyle = useIconStore(state => state.setDefaultStyle);

  React.useEffect(() => {
    setDefaultStyle('fal');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isStacked = searchParams.get('layout') === 'stacked';

  const [globalState, setGlobalState] = useState<GlobalContext>({
    apiDescriptionUrl: searchParams.get('spec') || DEFAULT_API_URL,
    setDescriptionUrl: _value => {
      const value = _value.trim() || DEFAULT_API_URL;

      let nextUrl = '/';
      if (value && value !== DEFAULT_API_URL) {
        nextUrl = `?spec=${value}${isStacked ? '&layout=stacked' : ''}`;
      }

      window.history.pushState(undefined, '', nextUrl);

      setTimeout(() => {
        setGlobalState({
          ...globalState,
          apiDescriptionUrl: value,
        });
      }, 0);
    },
    layout: isStacked ? 'stacked' : undefined,
  });

  return (
    <MosaicProvider>
      <GlobalContext.Provider value={globalState}>
        <Flex direction="col" bg="canvas" h="screen">
          <DemoNavbar />
          <ElementsAPI />
        </Flex>
      </GlobalContext.Provider>
    </MosaicProvider>
  );
}
