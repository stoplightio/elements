import { safeStringify } from '@stoplight/json';
import { AxiosRequestConfig } from 'axios';
import { get } from 'lodash';
import { MD5 } from 'object-hash';
import * as React from 'react';
import { AxiosContext } from '../containers/Provider';

export type UseRequestState<T> = {
  isLoading: boolean;
  data?: T;
  error?: {
    message: string;
  };
};

// Maps a hash of the request to the response data
const RequestCache = new Map<string, any>();

export function useRequest<T>(args: AxiosRequestConfig): UseRequestState<T> {
  const axios = React.useContext(AxiosContext);

  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [data, setData] = React.useState<T>();
  const [error, setError] = React.useState();

  const { key, request } = createRequest(args);

  const sendRequest = React.useCallback(
    req => {
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

      axios
        .request<T>(req)
        .then(response => {
          const responseData = response.data;

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
        .catch(e => {
          // TODO (CL): Should we delete the cache entry if there's an error? Might be better to leave it so there's no disruption to viewing the docs
          if (!cachedData) {
            RequestCache.delete(key);
            setData(undefined);
          }

          setError(e);
          setIsLoading(false);
        });
    },
    [axios],
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
  request: AxiosRequestConfig;
}

// Creates a request object with a stable reference as long as key doesn't change
function createRequest(request: AxiosRequestConfig): IRequestCacheEnty {
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
