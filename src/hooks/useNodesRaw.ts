import useSWR from 'swr';

interface INodeRawOptions {
  deref?: 'bundle' | 'remote';
}

export function useNodeRaw(srn: string, opts?: INodeRawOptions) {
  let query = `?srn=${srn}`;

  if (opts) {
    if (opts.deref) {
      query = `${query}&deref=${opts.deref}`;
    }
  }

  return useSWR<string>(`/nodes.raw${query}`);
}
