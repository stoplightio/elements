import { NodeData } from '@stoplight/elements-utils';
import { Oas2HttpOperationTransformer, Oas3HttpOperationTransformer } from '@stoplight/http-spec/oas/types';
import { encodePointerFragment, pointerToPath } from '@stoplight/json';
import { NodeType } from '@stoplight/types';
import { entries, get, isObject, last, map } from 'lodash';
import { filter, keyBy, mapValues, pipe } from 'lodash/fp';
import { OpenAPIObject } from 'openapi3-ts';
import { Spec } from 'swagger-schema-official';

import { ISourceNodeMap, NodeTypes } from './types';

export const isOas2 = (parsed: unknown): parsed is Spec =>
  isObject(parsed) &&
  'swagger' in parsed &&
  Number.parseInt(String((parsed as Partial<{ swagger: unknown }>).swagger)) === 2 &&
  Array.isArray((parsed as Partial<{ tags: unknown }>).tags || []);

export const isOas3 = (parsed: unknown): parsed is OpenAPIObject =>
  isObject(parsed) &&
  'openapi' in parsed &&
  Number.parseFloat(String((parsed as Partial<{ openapi: unknown }>).openapi)) >= 3 &&
  Array.isArray((parsed as Partial<{ tags: unknown }>).tags || []);

export const isOperation = (uri: string) => OPERATION_REGEXP.test(uri);

export const OAS_MODEL_REGEXP = /((definitions|components)\/?(schemas)?)\//;
export const MODEL_REGEXP = /schemas\//;
export const OPERATION_REGEXP = /\/operations\/.+|paths\/.+\/(get|post|put|patch|delete|head|options|trace)$/;

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
          const operationDocument = transformer({ document, path, method });
          let parsedUri;
          const encodedPath = String(encodePointerFragment(path));

          if (operationDocument.iid) {
            parsedUri = uri.replace(`paths/${encodedPath}/${method}`, `operations/${operationDocument.iid}`);
          } else {
            parsedUri = uri.replace(encodedPath, slugify(path));
          }
          uriMap[parsedUri] = operationDocument;
        } else if (match.type === NodeTypes.Model) {
          const schemaDocument = get(document, jsonPath);
          const parsedUri = uri.replace(OAS_MODEL_REGEXP, 'schemas/');
          uriMap[parsedUri] = schemaDocument;
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

function slugify(name: string) {
  return name
    .replace(/\/|{|}|\s/g, '-')
    .replace(/-{2,}/, '-')
    .replace(/^-/, '')
    .replace(/-$/, '');
}

export function mapUriToOperation(uriMap: IUriMap) {
  return pipe(
    () => entries(uriMap),
    filter(([uri]) => OPERATION_REGEXP.test(uri)),
    keyBy(([uri]) => uri),
    mapValues(([, node]) => {
      return node && isObject(node) ? node['method'] : undefined;
    }),
  )();
}

function findMapMatch(key: string | number, map: ISourceNodeMap[]): ISourceNodeMap | void {
  if (typeof key === 'number') return;
  for (const entry of map) {
    if (!!entry.match?.match(key) || (entry.notMatch !== void 0 && !entry.notMatch.match(key))) {
      return entry;
    }
  }
}

export const computeNodeData = (uriMap: IUriMap, tags: string[] = []): NodeData[] => {
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
            tags,
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
