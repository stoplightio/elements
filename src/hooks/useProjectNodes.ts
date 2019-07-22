import { IProjectNode } from '../types';
import { useRequest } from './useRequest';

export interface IProjectNodes {
  items: IProjectNode[];
}

export function useProjectNodes(srn: string) {
  return useRequest<IProjectNodes>({
    url: '/projects.nodes',
    params: { srn },
  });
}
