import { deserializeSrn, serializeSrn } from '@stoplight/path';
import { AxiosResponse } from 'axios';
import * as React from 'react';
import useSWR from 'swr';
import { AxiosContext } from '../containers/Provider';
import { IPaginatedResponse, IProjectNode } from '../types';

export function useProjectSearch(
  search: string,
  srn: string,
  opts: { group?: string; limit?: number; skip?: boolean } = {},
) {
  const projectSrn = serializeSrn({ ...deserializeSrn(srn), uri: undefined });
  const axios = React.useContext(AxiosContext);

  // Hardcoded limit of 20 since we don't have pagination yet
  const queryParams = [`srn=${projectSrn}`, `first=${opts.limit ?? 30}`];
  if (search) {
    queryParams.push(`search=${search}`);
  }
  if (opts.group) {
    queryParams.push(`group=${opts.group}`);
  }

  const { data: response, isValidating, error, revalidate } = useSWR<AxiosResponse<IPaginatedResponse<IProjectNode>>>(
    !opts.skip ? [`/projects.nodes?${queryParams.join('&')}`, axios] : null,
    axios.get,
    {
      shouldRetryOnError: false,
      dedupingInterval: 60 * 1000, // 1 minute
    },
  );

  return {
    data: response?.data,
    isValidating,
    error,
    revalidate,
  };
}
