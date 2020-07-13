import { Client } from 'urql';

let client: Client;

export function getUrqlClient(url: string, urqlClient?: Client) {
  if (urqlClient) {
    client = urqlClient;
  } else if (!client) {
    client = createUrqlClient(url);
  }

  return client;
}

export function createUrqlClient(url: string) {
  // TODO (CL): create urql client
  return new Client({
    url,
  });
}
