import * as React from 'react';
import { RequestContext } from '..';
import { createFetchClient } from './createFetchClient';

export const useFetchClient = () => {
  const requestConfig = React.useContext(RequestContext);
  return React.useMemo(() => createFetchClient(requestConfig), [requestConfig.host, requestConfig.headers]);
};
