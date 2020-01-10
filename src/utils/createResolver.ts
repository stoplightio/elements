import { Resolver } from '@stoplight/json-ref-resolver';
import { deserializeSrn, dirname, resolve, serializeSrn } from '@stoplight/path';
import { parse } from '@stoplight/yaml';
import axios, { AxiosAdapter, AxiosInstance } from 'axios';
import * as URI from 'urijs';

export function createResolver(client: AxiosInstance, srn?: string) {
  return new Resolver({
    dereferenceInline: true,
    dereferenceRemote: true,

    resolvers: {
      https: httpResolver(client),
      http: httpResolver(client),
      file: remoteFileResolver(client, srn),
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
function remoteFileResolver(host: string, srn?: string, client?: AxiosInstance) {
  const { shortcode, orgSlug, projectSlug, uri } = deserializeSrn(srn || '');

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
      return httpResolver(client).resolve(new URI(`${host}/nodes.raw?srn=${refSrn}`));
    },
  };
}

const httpResolver = (client: AxiosInstance = axios) => {
  return {
    resolve: async (ref: uri.URI) => {
      const res = await client.get(String(ref));
      return res.data;
    },
  };
};
