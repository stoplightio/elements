import { Request } from './store';

import * as React from 'react';

export const defaultRequest = new Request();
export const StoreContext = React.createContext(defaultRequest);

export const StoreProvider: React.FunctionComponent<any> = ({ value, children }) => {
  const [store, setStore] = React.useState(defaultRequest);

  React.useEffect(() => {
    setStore(new Request(value));
  }, [value]);

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export function useStore() {
  return React.useContext(StoreContext);
}
