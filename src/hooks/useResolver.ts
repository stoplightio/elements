import { IResolveError, IResolveResult } from '@stoplight/json-ref-resolver/types';
import { uniqBy } from 'lodash';
import * as React from 'react';
import { ActiveSrnContext, HostContext, TokenContext } from '../containers/Provider';
import { DocsNodeType } from '../types';
import { useParsedData } from './useParsedData';

import ResolverWorker, { WebWorker } from 'web-worker:../worker.ts';

let worker: WebWorker;

/**
 * Resolves all remote http and relative file $refs for the given value
 *
 * Any component using this hook MUST be wrapped in both the HostContext and ActiveSrnContext providers
 */
export function useResolver<T = any>(type: DocsNodeType, value: string) {
  const srn = React.useContext(ActiveSrnContext);
  const host = React.useContext(HostContext);
  const token = React.useContext(TokenContext);
  const parsedValue = useParsedData(type, value);

  const [resolved, setResolved] = React.useState<{
    result: T;
    errors: IResolveError[];
    graph?: IResolveResult['graph'];
  }>({
    result: parsedValue,
    errors: [],
  });

  if (!worker) {
    worker = new ResolverWorker();
  }

  // TODO (CL): We need to cache the resolve result so that we don't try to keep dereferencing it
  React.useEffect(() => {
    // Only resolve if we've succeeded in parsing the string
    if (typeof parsedValue !== 'object' || !worker) return;

    worker.addEventListener('message', (msg: any) => {
      if (srn !== msg.data.srn) return;

      // @ts-ignore: need to remove graph from the typings
      setResolved({
        result: msg.data.result || parsedValue,
        errors: uniqBy(msg.data.errors, 'message'), // remove any duplicate messages
      });
    });

    worker.postMessage({ srn, value: parsedValue, host, token });
  }, [srn]);

  return resolved;
}
