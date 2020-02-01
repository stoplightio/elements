import { deserializeSrn } from '@stoplight/path';
import { AxiosResponse } from 'axios';
import * as React from 'react';
import useSWR from 'swr';
import { AxiosContext } from '../containers/Provider';
import { INodeInfo } from '../types';

export function useNodeInfo(srn: string, opts: { group?: string; version?: string; skip?: boolean } = {}) {
  const { uri } = deserializeSrn(srn);
  const axios = React.useContext(AxiosContext);

  const queryParams = [`srn=${srn}`, 'deref=bundle'];
  if (opts.version) {
    queryParams.push(`version=${opts.version}`);
  }
  if (opts.group) {
    queryParams.push(`group=${opts.group}`);
  }

  const { data: response, isValidating, error, revalidate } = useSWR<AxiosResponse<INodeInfo>>(
    opts.skip || !uri ? null : [`/nodes.info?${queryParams.join('&')}`],
    axios.get,
    {
      shouldRetryOnError: false,
      dedupingInterval: 5 * 60 * 1000, // 5 minutes
    },
  );

  return {
    data: response?.data,
    isValidating,
    error,
    revalidate,
  };
}
