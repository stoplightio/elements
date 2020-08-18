import { Client } from 'urql';

let client: Client;

type ClientOptions = {
  urqlClient?: Client;
  authToken?: string;
};

export function getUrqlClient(url: string, options?: ClientOptions) {
  if (options?.urqlClient) {
    client = options.urqlClient;
  } else if (!client) {
    client = createUrqlClient(url, options?.authToken);
  }

  return client;
}

export function createUrqlClient(url: string, authToken?: string) {
  // TODO (CL): create urql client
  return new Client({
    url,
    ...(authToken && {
      fetchOptions: () => ({
        headers: { authorization: `Bearer ${authToken}` },
      }),
    }),
  });
}
