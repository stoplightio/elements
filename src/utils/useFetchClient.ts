import * as React from 'react';
import { HostContext, TokenContext } from '..';
import { createFetchClient } from './createFetchClient';

export const useFetchClient = () => {
  const host = React.useContext(HostContext);
  const token = React.useContext(TokenContext);
  return React.useMemo(
    () =>
      createFetchClient({
        host,
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : null,
      }),
    [host, token],
  );
};
