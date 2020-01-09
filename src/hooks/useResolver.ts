import { IResolveError, IResolveResult } from '@stoplight/json-ref-resolver/types';
import { uniqBy } from 'lodash';
import * as React from 'react';
import { ActiveSrnContext, AxiosContext, HostContext, ResolverContext } from '../containers/Provider';
import { DocsNodeType } from '../types';
import { cancelablePromise } from '../utils/cancelablePromise';
import { createResolver } from '../utils/createResolver';
import { useParsedData } from './useParsedData';

/**
 * Resolves all remote http and relative file $refs for the given value
 *
 * Any component using this hook MUST be wrapped in both the HostContext and ActiveSrnContext providers
 */
export function useResolver<T = any>(type: DocsNodeType, value: string) {
  const host = React.useContext(HostContext);
  const srn = React.useContext(ActiveSrnContext);
  const client = React.useContext(AxiosContext);
  const resolver = React.useContext(ResolverContext) || createResolver(host, srn, client);
  const parsedValue = useParsedData(type, value);

  const [resolved, setResolved] = React.useState<{
    result: T;
    errors: IResolveError[];
    graph?: IResolveResult['graph'];
  }>({
    result: parsedValue,
    errors: [],
  });

  React.useEffect(() => {
    // Only resolve if we've succeeded in parsing the string
    if (typeof parsedValue !== 'object') return;

    const { promise, cancel } = cancelablePromise(resolver.resolve(parsedValue));

    promise
      .then(res => {
        setResolved({
          result: res.result,
          errors: uniqBy(res.errors, 'message'), // remove any duplicate messages
          graph: res.graph,
        });
      })
      .catch(e => {
        if (!e.isCanceled) {
          console.error('Error resolving', type, e);
        }
      });

    return () => {
      // If the component unmounts, cancel the promise so we don't try to update the React state
      cancel();
    };
  }, [value, srn]);

  return resolved;
}
