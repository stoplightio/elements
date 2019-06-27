import axios from 'axios';
import * as React from 'react';

export interface IProvider {
  host: string;
  token: string;
}

export const Context = React.createContext(axios.create());

export const Provider: React.FunctionComponent<IProvider> = ({ host, token, children }) => {
  const client = React.useMemo(
    () =>
      axios.create({
        baseURL: host || 'http://localhost:4060',
        headers: token && {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }),
    [host, token],
  );

  return <Context.Provider value={client}>{children}</Context.Provider>;
};
