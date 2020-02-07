import useSWR from 'swr';
import { useFetchClient } from '../utils/useFetchClient';

interface INodeRawOptions {
  deref?: 'bundle' | 'remote';
}

export function useNodeRaw(srn: string, opts?: INodeRawOptions) {
  const fetch = useFetchClient();
  let query = `?srn=${srn}`;

  if (opts) {
    if (opts.deref) {
      query = `${query}&deref=${opts.deref}`;
    }
  }

  return useSWR<string>(`/nodes.raw${query}`, (input: RequestInfo, init?: RequestInit) =>
    fetch(input, init).then(res => {
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
      }

      return res.text();
    }),
  );
}
