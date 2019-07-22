import { IProjectNode } from '../types';
import { IPaginatedResponse, useRequest } from './useRequest';

const MAX_PAGE_SIZE = 300; // maximumn number of items the API can return on a single request

export function useProjectNodes(srn: string) {
  return useRequest<IPaginatedResponse<IProjectNode>>({
    url: '/projects.nodes',
    params: {
      srn,
      first: MAX_PAGE_SIZE, // return the max number of nodes for a single request
    },
  });
}
