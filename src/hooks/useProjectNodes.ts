import { uniqBy } from 'lodash';
import { IPaginatedResponse, IProjectNode } from '../types';
import { deserializeSrn, serializeSrn } from '../utils/srns';
import { useRequest } from './useRequest';

const MAX_PAGE_SIZE = 300; // maximumn number of items the API can return on a single request

export function useProjectNodes(srn: string, opts: { group?: string } = {}) {
  // Remove node uri from the SRN
  const projectSrn = serializeSrn({ ...deserializeSrn(srn), uri: undefined });

  const { isLoading, data, error } = useRequest<IPaginatedResponse<IProjectNode>>({
    pathname: '/projects.nodes',
    params: {
      srn: projectSrn,
      group: opts.group,
      first: MAX_PAGE_SIZE, // return the max number of nodes for a single request
    },
  });

  return {
    data: {
      ...data,
      items: data ? uniqBy(data.items, 'srn') : [],
    },
    isLoading,
    error,
  };
}
