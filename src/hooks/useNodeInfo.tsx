import { IGraphNode } from '../utils/node';
import { useRequest } from './useRequest';

export const useNodeInfo = (srn: string, version?: string) => {
  return useRequest<IGraphNode>({ url: '/nodes.info', params: { srn, version } });
};
