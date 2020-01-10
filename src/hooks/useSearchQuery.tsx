import { filter, uniqBy } from 'lodash';
import { useRequest } from '.';
import { IPaginatedResponse, IProjectNode } from '../types';

export function useSearchQuery(query: string, srn: string, isOpen: boolean, group?: string) {
  const { isLoading, data, error } = useRequest<IPaginatedResponse<IProjectNode>>({
    url: '/projects.nodes',
    params: {
      search: query,
      group,
      srn,
      first: 30,
    },
  });

  return {
    data: {
      ...data,
      items: data ? uniqBy(data.items, 'srn') : [],
    },
    loading: isLoading,
    error,
    // tslint:disable-next-line: no-empty
    fetchMore: ({}) => {},
  };
}
