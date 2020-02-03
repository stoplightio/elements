import { deserializeSrn, serializeSrn } from '@stoplight/path';
import * as React from 'react';
import useSWR from 'swr';
import { IPaginatedResponse, IProjectNode } from '../types';
import { useFetchClient } from '../utils/useFetchClient';

export function useProjectSearch(
  search: string,
  srn: string,
  opts: { group?: string; limit?: number; skip?: boolean } = {},
) {
  const projectSrn = serializeSrn({ ...deserializeSrn(srn), uri: undefined });
  const fetch = useFetchClient();

  // Hardcoded limit of 20 since we don't have pagination yet
  const queryParams = [`srn=${projectSrn}`, `first=${opts.limit ?? 30}`];
  if (search) {
    queryParams.push(`search=${search}`);
  }
  if (opts.group) {
    queryParams.push(`group=${opts.group}`);
  }

  const { data, isValidating, error, revalidate } = useSWR<IPaginatedResponse<IProjectNode>>(
    !opts.skip ? [`/projects.nodes?${queryParams.join('&')}`] : null,
    (input: RequestInfo, init?: RequestInit) =>
      fetch(input, init).then(res => {
        if (!res.ok) {
          throw new Error(`${res.status} ${res.statusText}`);
        }

        return res.json();
      }),
    {
      shouldRetryOnError: false,
      dedupingInterval: 60 * 1000, // 1 minute
    },
  );

  return {
    data,
    isValidating,
    error,
    revalidate,
  };
}
