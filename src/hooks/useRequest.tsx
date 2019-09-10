import { safeStringify } from '@stoplight/json';
import { RequestMaker } from '@stoplight/request-maker';
import { IHttpOperation } from '@stoplight/types';
import { AxiosRequestConfig } from 'axios';
import hash from 'object-hash';
import * as React from 'react';
import { AxiosContext } from '../containers/Provider';

export interface IPaginatedResponse<T> {
  items: T[];
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
    endCursor: string;
  };
  totalCount: number;
}

export type UseRequestState<T> = {
  isLoading: boolean;
  data?: T;
  error?: {
    message: string;
  };
};

// Maps a hash of the operation to the request maker object
const RequestMakers = new Map<string, RequestMaker>();

export function useRequestMaker(operation: IHttpOperation): RequestMaker {
  const key = getOperationKey(operation);

  let requestMaker = RequestMakers.get(key);
  if (!requestMaker) {
    requestMaker = new RequestMaker({ operation });
    RequestMakers.set(key, requestMaker);
  }

  return requestMaker;
}

// Maps a hash of the request to the response data
const RequestCache = new Map<string, any>();

export function useRequest<T>(args: AxiosRequestConfig): UseRequestState<T> {
  const axios = React.useContext(AxiosContext);

  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [data, setData] = React.useState<T>();
  const [error, setError] = React.useState();

  const { key, request } = createRequest(args);

  const sendRequest = React.useCallback(() => {
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
      .request<T>(request)
      .then(response => {
        if (!cachedData || safeStringify(response.data) !== safeStringify(cachedData)) {
          // Update the cache
          RequestCache.set(key, response.data);
          setData(response.data);
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
  }, [axios, request]);

  React.useEffect(() => sendRequest(), [request]);

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
    const key = hash.MD5(request);

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

function getOperationKey(operation: IHttpOperation): string {
  const prev = React.useRef<string | null>(null);

  return React.useMemo(() => {
    // Create a hash of the operation so we can ensure reference equality
    const key = hash.MD5(operation);

    if (prev.current === key) {
      return prev.current;
    } else {
      prev.current = key;
      return prev.current;
    }
  }, [operation]);
}
