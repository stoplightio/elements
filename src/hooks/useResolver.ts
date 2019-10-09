import { Resolver } from '@stoplight/json-ref-resolver';
import { IResolveResult } from '@stoplight/json-ref-resolver/types';
import { deserializeSrn, dirname, resolve, serializeSrn } from '@stoplight/path';
import { NodeType } from '@stoplight/types';
import { parse } from '@stoplight/yaml';
import axios from 'axios';
import * as React from 'react';
import * as URI from 'urijs';
import { ActiveSrnContext, HostContext, ResolverContext } from '../containers/Provider';
import { cancelablePromise } from '../utils/cancelablePromise';
import { useParsedData } from './useParsedData';

/**
 * Resolves all remote http and relative file $refs for the given value
 *
 * Any component using this hook MUST be wrapped in both the HostContext and ActiveSrnContext providers
 */
export function useResolver<T = any>(type: NodeType | 'json_schema', value: string) {
  const host = React.useContext(HostContext);
  const srn = React.useContext(ActiveSrnContext);
  const resolver = React.useContext(ResolverContext) || createResolver(host, srn);
  const parsedValue = useParsedData(type, value);

  const [resolved, setResolved] = React.useState<{
    result: T;
    errors: IResolveResult['errors'];
  }>({
    result: parsedValue,
    errors: [],
  });

  React.useEffect(() => {
    // Only resolve if we've succeeded in parsing the string
    if (typeof parsedValue !== 'object') return;

    const { promise, cancel } = cancelablePromise(resolver.resolve(parsedValue, resolveOptions));

    promise
      .then(res => {
        setResolved({
          result: res.result,
          errors: res.errors,
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

  return resolved || parsedValue;
}

function createResolver(host: string, srn: string) {
  return new Resolver({
    resolvers: {
      https: httpReader,
      http: httpReader,
      file: createFileReader(host, srn),
    },

    async parseResolveResult(opts) {
      if (typeof opts.result === 'string') {
        try {
          opts.result = parse(opts.result);
        } catch (e) {
          // noop, probably not json/yaml
        }
      }

      return opts;
    },
  });
}

/**
 * Resolves a $ref to another file in the same project to it's export URL in the Stoplight API
 *
 * @param host Stoplight API host
 * @param srn The active node's SRN
 */
function createFileReader(host: string, srn: string) {
  const { shortcode, orgSlug, projectSlug, uri } = deserializeSrn(srn);

  return {
    resolve(ref: uri.URI) {
      // If we don't have a URI, there's no way we can resolve the $ref's uri
      if (!uri) {
        throw new Error(`Failed to resolve ${ref}`);
      }

      // Rebuild the SRN with the $ref's uri
      const refSrn = serializeSrn({
        shortcode,
        orgSlug,
        projectSlug,
        uri: resolve(dirname(uri), String(ref)),
      });

      // Use the http resolver to resolve the node's raw export
      return httpReader.resolve(new URI(`${host}/nodes.raw?srn=${refSrn}`));
    },
  };
}

const httpReader = {
  async resolve(ref: uri.URI) {
    const res = await axios.get(String(ref));
    return res.data;
  },
};

const resolveOptions = {
  dereferenceInline: true,
  dereferenceRemote: true,
};
