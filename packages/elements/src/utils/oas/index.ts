import { NodeData } from '@stoplight/elements-utils';
import { Oas2HttpOperationTransformer, Oas3HttpOperationTransformer } from '@stoplight/http-spec/oas/types';
import { encodePointerFragment, pointerToPath } from '@stoplight/json';
import { NodeType } from '@stoplight/types';
import { get, isObject, last, map } from 'lodash';
import { OpenAPIObject } from 'openapi3-ts';
import { Spec } from 'swagger-schema-official';

import { ISourceNodeMap, NodeTypes } from './types';

export const isOas2 = (parsed: unknown) =>
  isObject(parsed) &&
  'swagger' in parsed &&
  Number.parseInt(String((parsed as Partial<{ swagger: unknown }>).swagger)) === 2;

export const isOas3 = (parsed: unknown) =>
  isObject(parsed) &&
  'openapi' in parsed &&
  Number.parseFloat(String((parsed as Partial<{ openapi: unknown }>).openapi)) >= 3;

export const isOperation = (uri: string) => OPERATION_REGEXP.test(uri);

export const MODEL_REGEXP = /^\/(definitions|components\/schemas)/;
export const OPERATION_REGEXP = /\/paths\/.+\/(get|post|put|patch|delete|head|options|trace)$/;

export interface IUriMap {
  [uri: string]: unknown;
}

interface IComputeUriMapProps {
  document: Spec | OpenAPIObject;
  data: unknown;
  map: ISourceNodeMap[];
  transformer: Oas2HttpOperationTransformer | Oas3HttpOperationTransformer;
  parentUri?: string;
}

export function getNodeType(uri: string): NodeType {
  return MODEL_REGEXP.test(uri)
    ? NodeType.Model
    : OPERATION_REGEXP.test(uri)
    ? NodeType.HttpOperation
    : NodeType.HttpService;
}

export function computeUriMap({ document, data, map, transformer, parentUri }: IComputeUriMapProps): IUriMap {
  const uriMap: IUriMap = {};

  if (isObject(data)) {
    for (const key of Object.keys(data)) {
      const sanitizedKey = encodePointerFragment(key);
      const match = findMapMatch(sanitizedKey, map);
      if (match) {
        const uri = `${parentUri || ''}/${sanitizedKey}`;

        const jsonPath = pointerToPath(`#${uri}`);
        if (match.type === NodeTypes.Operation && jsonPath.length === 3) {
          const path = String(jsonPath[1]);
          const method = String(jsonPath[2]);
          uriMap[uri] = transformer({ document, path, method });
        } else if (match.type === NodeTypes.Model) {
          uriMap[uri] = get(document, jsonPath);
        }

        if (match.children) {
          Object.assign(
            uriMap,
            computeUriMap({ map: match.children, document, data: data[key], parentUri: uri, transformer }),
          );
        }
      }
    }
  }

  return uriMap;
}

function findMapMatch(key: string | number, map: ISourceNodeMap[]): ISourceNodeMap | void {
  if (typeof key === 'number') return;
  for (const entry of map) {
    if (!!entry.match?.match(key) || (entry.notMatch !== void 0 && !entry.notMatch.match(key))) {
      return entry;
    }
  }
}

export const computeNodeData: (uriMap: IUriMap) => NodeData[] = uriMap => {
  const nodes: NodeData[] = [];

  for (const [uri, node] of Object.entries(uriMap)) {
    if (node && isObject(node)) {
      const type =
        uri === '/'
          ? NodeType.HttpService
          : OPERATION_REGEXP.test(uri)
          ? NodeType.HttpOperation
          : MODEL_REGEXP.test(uri)
          ? NodeType.Model
          : NodeType.Unknown;

      switch (type) {
        case NodeType.HttpService:
          nodes.push({
            name: node['name'],
            type,
            uri,
            tags: [],
          });
          break;
        case NodeType.HttpOperation:
          nodes.push({
            name: node['summary'] || node['path'],
            type,
            uri,
            tags: map(node['tags'], tag => tag['name']),
          });
          break;
        case NodeType.Model:
          nodes.push({
            name: node['title'] || last(uri.split('/')) || '',
            type,
            uri,
            tags: node['x-tags'],
          });
          break;
      }
    }
  }

  return nodes;
};
