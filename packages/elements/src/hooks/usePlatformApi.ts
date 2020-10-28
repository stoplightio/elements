import { Optional } from '@stoplight/types';
import Axios from 'axios';
import * as React from 'react';
import useSwr from 'swr';
import URI from 'urijs';
import URITemplate from 'urijs/src/URITemplate';

import { defaultPlatformUrl } from '../constants';

const fetcher = (url: string, method: 'get' | 'post', authToken: Optional<string>, data?: ActionsApiProps) => {
  return Axios.request({
    url,
    method,
    data,
    ...(authToken && {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    }),
  }).then(res => res.data);
};

type PlatformApiProps = {
  platformUrl?: string;
  workspaceSlug: string;
  projectSlug: string;
  nodeUri?: string;
  authToken?: string;
};

type ActionsApiProps = {
  input: {
    workspaceSlug: string;
    projectSlug: string;
    uri?: string;
  };
};

export function usePlatformApi<T>(
  uriTemplate: string,
  { platformUrl, workspaceSlug, projectSlug, nodeUri, authToken }: PlatformApiProps,
) {
  const template = new URITemplate(uriTemplate);
  const url = new URI(platformUrl ?? defaultPlatformUrl)
    .path(template.expand({ workspaceSlug, projectSlug, uri: nodeUri?.substr(1) }).toString())
    .toString();

  return useSwr<T>([url, 'get', authToken], fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  });
}

//TODO: to be removed when GET endpoint for fetching mockUrl will be ready
export function useActionsApi<T>(
  path: string,
  { platformUrl, projectSlug, workspaceSlug, nodeUri, authToken }: PlatformApiProps,
) {
  const url = new URI(platformUrl ?? defaultPlatformUrl).path(path).toString();
  const data: ActionsApiProps = React.useMemo(
    () => ({
      input: {
        projectSlug,
        workspaceSlug,
        uri: nodeUri,
      },
    }),
    [nodeUri, projectSlug, workspaceSlug],
  );
  return useSwr<T>([url, 'post', authToken, data], fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  });
}
