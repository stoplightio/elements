import { INodeInfo } from '../types';
import { useRequest } from './useRequest';

export const useNodeInfo = (srn: string, version?: string) => {
  return useRequest<INodeInfo>({ url: '/nodes.info', params: { srn, version } });
};
