import Axios from 'axios';
import useSwr from 'swr';
import URI from 'urijs';
import URITemplate from 'urijs/src/URITemplate';

import { defaultPlatformUrl } from '../constants';

const fetcher = ({ url, method, data, authToken }: FetcherOptions) => {
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

type FetcherOptions = {
  url: string;
  method: 'get' | 'post';
  data?: ActionsApiProps;
  authToken?: string;
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

export function usePlatformApi(
  uriTemplate: string,
  { platformUrl, workspaceSlug, projectSlug, nodeUri, authToken }: PlatformApiProps,
) {
  const template = new URITemplate(uriTemplate);
  const url = new URI(platformUrl ?? defaultPlatformUrl)
    .path(template.expand({ workspaceSlug, projectSlug, uri: nodeUri?.substr(1) }).toString())
    .toString();

  return useSwr(url, () => fetcher({ url, method: 'get', authToken }), {
    shouldRetryOnError: false,
  });
}

//TODO: to be removed when GET endpoint for fetching mockUrl will be ready
export function useActionsApi(
  path: string,
  { platformUrl, projectSlug, workspaceSlug, nodeUri, authToken }: PlatformApiProps,
) {
  const url = new URI(platformUrl ?? defaultPlatformUrl).path(path).toString();
  const data: ActionsApiProps = {
    input: {
      projectSlug,
      workspaceSlug,
      uri: nodeUri,
    },
  };
  return useSwr(url, () => fetcher({ url, method: 'post', data, authToken }));
}
