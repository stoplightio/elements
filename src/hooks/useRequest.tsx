import { safeStringify } from '@stoplight/json';
import { join, stripRoot } from '@stoplight/path';
import { Dictionary, Primitive } from '@stoplight/types';
import { get } from 'lodash';
import { MD5 } from 'object-hash';
import * as React from 'react';

import { RequestContext } from '..';
import { useFetchClient } from '../utils/useFetchClient';

export type UseRequestState<T> = {
  isLoading: boolean;
  data?: T;
  error?: Error;
};

// Maps a hash of the request to the response data
const RequestCache = new Map<string, any>();

interface IRequestConfig {
  pathname: string;
  params: Dictionary<Primitive, string>;
}

export function useRequest<T>(args: IRequestConfig): UseRequestState<T> {
  const requestContext = React.useContext(RequestContext);
  const client = useFetchClient();
  const computeUrl = React.useCallback<(args: IRequestConfig) => string>(
    ({ pathname, params }) => {
      const url = new URL(join(requestContext.host, stripRoot(pathname)));
      for (const [name, value] of Object.entries(params)) {
        if (value !== undefined) {
          url.searchParams.append(name, String(value));
        }
      }

      return url.href;
    },
    [requestContext.host],
  );

  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [data, setData] = React.useState<T>();
  const [error, setError] = React.useState();

  const { key, request } = createRequest(args);

  const sendRequest = React.useCallback(
    (req) => {
      let isMounted = true;

      // Check if we have this request stored in the cache
      const cachedData = RequestCache.get(key);
      if (cachedData) {
        setError(undefined);
        setData(cachedData);
        setIsLoading(false);
      } else {
        // No cache entry so set loading
        setIsLoading(true);
      }

      client(computeUrl(req))
        .then((response) => response.json())
        .then((responseData) => {
          if (!isMounted) return;

          if (!cachedData || safeStringify(responseData) !== safeStringify(cachedData)) {
            if ((responseData as any).items && cachedData && cachedData.items) {
              (responseData as any).items.push(...cachedData.items);
            }

            // Update the cache
            RequestCache.set(key, responseData);
            setData(responseData);
          }

          // Handle getting the next page
          if (get(responseData, 'pageInfo.endCursor')) {
            sendRequest({
              ...req,
              params: {
                ...req.params,
                after: get(responseData, 'pageInfo.endCursor'),
              },
            });
          }

          setError(undefined);
          setIsLoading(false);
        })
        .catch((e) => {
          if (!isMounted) return;
          // TODO (CL): Should we delete the cache entry if there's an error? Might be better to leave it so there's no disruption to viewing the docs
          if (!cachedData) {
            RequestCache.delete(key);
            setData(undefined);
          }

          setError(e);
          setIsLoading(false);
        });

      return () => {
        isMounted = false;
      };
    },
    [client, key],
  );

  React.useEffect(() => sendRequest(request), [request]);

  return {
    isLoading,
    data,
    error,
  };
}

interface IRequestCacheEnty {
  key: string;
  request: object;
}

// Creates a request object with a stable reference as long as key doesn't change
function createRequest(request: object): IRequestCacheEnty {
  const prev = React.useRef<IRequestCacheEnty | null>(null);

  return React.useMemo(() => {
    // Create a hash of the request so we can ensure reference equality
    const key = MD5(request);

    if (prev.current !== null && prev.current.key === key) {
      return prev.current;
    } else {
      prev.current = {
        key,
        request,
      };
      return prev.current;
    }
  }, [request]);
}
