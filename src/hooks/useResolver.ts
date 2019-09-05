import { safeParse } from '@stoplight/json';
import { Resolver } from '@stoplight/json-ref-resolver';
import { NodeType } from '@stoplight/types';
import { parse } from '@stoplight/yaml';
import fetch from 'isomorphic-unfetch';
import * as React from 'react';

export function useResolver(type: NodeType | 'json_schema' | 'http', value: string) {
  const [resolved, setResolved] = React.useState();

  const parsedValue = React.useMemo(() => {
    if (
      type === 'http' ||
      type === 'json_schema' ||
      type === NodeType.Model ||
      type === NodeType.HttpOperation ||
      type === NodeType.HttpService
    ) {
      return safeParse(value);
    }
  }, [value]);

  React.useEffect(() => {
    // Only resolve if we've succeeded in parsing the string
    if (typeof parsedValue !== 'object') return;

    // if we have a parsed value (e.g. json schema or http operation), resolve it
    httpResolver
      .resolve(parsedValue, {
        dereferenceInline: true,
        dereferenceRemote: true,
      })
      .then(res => {
        setResolved(res.result);
      })
      .catch(e => {
        console.error('Error resolving object', e);
      });
  }, [value]);

  return resolved || parsedValue;
}

/**
 * Resolver - simple one to handle http refs
 */

const httpReader = {
  async resolve(ref: any) {
    return (await fetch(String(ref))).text();
  },
};

export const httpResolver = new Resolver({
  resolvers: {
    https: httpReader,
    http: httpReader,
  },

  async parseResolveResult(opts) {
    opts.result = parse(opts.result);

    return opts;
  },
});

/** END resolver */
