import useSWR from 'swr';
import { INodeGraph } from '../types';

interface INodeGraphOptions {
  type?: 'inbound' | 'outbound';
  depth?: number;
}

export function useNodeGraph(srn: string, opts?: INodeGraphOptions) {
  let query = `?srn=${srn}`;

  if (opts) {
    if (opts.type) {
      query = `${query}&type=${opts.type}`;
    }

    if (opts.depth) {
      query = `${query}&depth=${opts.depth}`;
    }
  }

  return useSWR<INodeGraph>(`/nodes.graph${query}`);
}
