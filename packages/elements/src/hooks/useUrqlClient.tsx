import * as React from 'react';
import { Client } from 'urql';

type ClientOptions = {
  urqlClient?: Client;
  authToken?: string;
};

export function useUrqlClient(url: string, options?: ClientOptions) {
  return React.useMemo(() => {
    if (options?.urqlClient) {
      return options.urqlClient;
    } else {
      return createUrqlClient(url, options?.authToken);
    }
  }, [url, options?.urqlClient, options?.authToken]);
}

function createUrqlClient(url: string, authToken?: string) {
  return new Client({
    url,
    ...(authToken && {
      fetchOptions: () => ({
        headers: { authorization: `Bearer ${authToken}` },
      }),
    }),
  });
}
