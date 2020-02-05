import { deserializeSrn } from '@stoplight/path';
import React from 'react';
import useSWR from 'swr';
import { ProjectTokenContext } from '../containers/Provider';
import { INodeInfo } from '../types';
import { useFetchClient } from '../utils/useFetchClient';

export function useNodeInfo(srn: string, opts: { group?: string; version?: string; skip?: boolean } = {}) {
  const { uri } = deserializeSrn(srn);
  const fetch = useFetchClient();
  const projectToken = React.useContext(ProjectTokenContext);

  const queryParams = [`srn=${srn}`];
  if (opts.version) {
    queryParams.push(`version=${opts.version}`);
  }
  if (opts.group) {
    queryParams.push(`group=${opts.group}`);
  }
  if (projectToken) {
    queryParams.push(`token=${projectToken}`);
  }

  const { data, isValidating, error, revalidate } = useSWR<INodeInfo>(
    opts.skip || !uri ? null : [`/nodes.info?${queryParams.join('&')}`],
    (input: RequestInfo, init?: RequestInit) =>
      fetch(input, init).then(res => {
        if (!res.ok) {
          throw new Error(`${res.status} ${res.statusText}`);
        }

        return res.json();
      }),
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      dedupingInterval: 5 * 60 * 1000, // 5 minutes
    },
  );

  return {
    data,
    isValidating,
    error,
    revalidate,
  };
}
