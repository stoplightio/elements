import { INodeInfo } from '../types';
import { useRequest } from './useRequest';

export function useNodeInfo(srn: string, opts: { group?: string; version?: string } = {}) {
  return useRequest<INodeInfo>({
    url: '/nodes.info',
    params: { srn, version: opts.version, group: opts.group, deref: 'bundle' },
  });
}
