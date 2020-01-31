import { createFetchClient } from './utils/createFetchClient';
import { createResolver } from './utils/createResolver';

declare const self: DedicatedWorkerGlobalScope;

self.addEventListener('message', async e => {
  const {
    data: { srn, value, host, token },
  } = e;

  const client = createFetchClient({
    host,
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : null,
  });

  const resolver = createResolver(client, srn);

  try {
    const { result, errors } = await resolver.resolve(value);

    self.postMessage({
      srn,
      result,
      errors,
    });
  } catch (ex) {
    self.postMessage(null);
  }
});
