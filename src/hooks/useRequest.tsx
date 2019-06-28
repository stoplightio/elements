import { AxiosRequestConfig } from 'axios';
import * as React from 'react';
import { ApolloContext } from '../containers/Provider';

const cache = new Map();

export type UseRequestState<T> = {
  isLoading: boolean;
  data?: T;
  error?: {
    message: string;
  };
};

export type UseRequestResult<T> = [UseRequestState<T>, () => void];

export function useRequest<T>(args: AxiosRequestConfig): UseRequestResult<T> {
  const client = React.useContext(ApolloContext);

  const [state, setState] = React.useState<UseRequestState<T>>({ isLoading: true, data: undefined, error: undefined });

  const request = createRequest(args);

  const sendRequest = React.useCallback(() => {
    const initialData = cache.get(request);

    if (initialData && initialData !== state.data) {
      setState({ isLoading: false, data: initialData, error: undefined });
    }

    client
      .request<T>(request)
      .then(({ data }) => {
        cache.set(request, data);
        setState({ isLoading: false, error: undefined, data });
      })
      .catch(error => {
        cache.set(request, undefined);
        setState({ isLoading: false, data: undefined, error });
      });
  }, [client, request, setState]);

  React.useEffect(() => sendRequest(), [request]);

  return [state, sendRequest];
}

const createRequest = (request: AxiosRequestConfig) => {
  const prev = React.useRef<any>(undefined);

  return React.useMemo(() => {
    const stringifiedRequest = JSON.stringify(request);

    if (JSON.stringify(prev.current) === stringifiedRequest) {
      return prev.current;
    } else {
      prev.current = request;
      return request;
    }
  }, [request]);
};
