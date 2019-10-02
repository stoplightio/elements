import { Resolver } from '@stoplight/json-ref-resolver';
import { IResolveResult, IResolverOpts } from '@stoplight/json-ref-resolver/types';
import { NodeType } from '@stoplight/types';
import { parse } from '@stoplight/yaml';
import fetch from 'isomorphic-unfetch';
import uniqBy from 'lodash/uniqBy';
import * as React from 'react';
import { useParsedData } from './useParsedData';

export function useResolver(type: NodeType | 'json_schema' | 'http_request', value: string) {
  const parsedValue = useParsedData(type, value);

  const [resolved, setResolved] = React.useState<{
    result: IResolveResult['result'];
    errors: IResolveResult['errors'];
    graph?: IResolveResult['graph'];
  }>({
    result: parsedValue,
    errors: [],
  });

  React.useEffect(() => {
    // Only resolve if we've succeeded in parsing the string
    if (typeof parsedValue !== 'object') return;

    const httpResolver = new Resolver(resolverOpts);

    // if we have a parsed value (e.g. json schema or http operation), resolve it
    httpResolver
      .resolve(parsedValue, {
        dereferenceInline: true,
        dereferenceRemote: true,
      })
      .then(res => {
        setResolved({
          result: res.result,
          errors: uniqBy(res.errors, 'message'), // remove any duplicate messages
          graph: res.graph,
        });
      })
      .catch(e => {
        console.error('Error resolving', type, e);
      });
  }, [value]);

  return resolved || parsedValue;
}

/**
 * Resolver - simple one to handle http refs
 */

const httpReader = {
  async resolve(ref: any) {
    const res = await fetch(String(ref));

    if (res.status >= 400) {
      throw new Error(res.statusText);
    }

    return res.text();
  },
};

const resolverOpts: IResolverOpts = {
  resolvers: {
    https: httpReader,
    http: httpReader,
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
};

/** END resolver */
