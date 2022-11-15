import { slugify } from '@stoplight/elements-core';
import type {
  Oas2HttpOperationTransformer,
  Oas2HttpServiceTransformer,
  Oas3HttpOperationTransformer,
  Oas3HttpServiceTransformer,
} from '@stoplight/http-spec/oas';
import { transformOas2Operation, transformOas2Service } from '@stoplight/http-spec/oas2';
import { transformOas3Operation, transformOas3Service } from '@stoplight/http-spec/oas3';
import { encodePointerFragment, pointerToPath } from '@stoplight/json';
import { NodeType } from '@stoplight/types';
import { get, isObject, last } from 'lodash';
import { OpenAPIObject } from 'openapi3-ts';
import { Spec } from 'swagger-schema-official';

import { oas2SourceMap } from './oas2';
import { oas3SourceMap } from './oas3';
import { ISourceNodeMap, NodeTypes, ServiceChildNode, ServiceNode } from './types';

const isOas2 = (parsed: unknown): parsed is Spec =>
  isObject(parsed) &&
  'swagger' in parsed &&
  Number.parseInt(String((parsed as Partial<{ swagger: unknown }>).swagger)) === 2;

const isOas3 = (parsed: unknown): parsed is OpenAPIObject =>
  isObject(parsed) &&
  'openapi' in parsed &&
  Number.parseFloat(String((parsed as Partial<{ openapi: unknown }>).openapi)) >= 3;

const isOas31 = (parsed: unknown): parsed is OpenAPIObject =>
  isObject(parsed) &&
  'openapi' in parsed &&
  Number.parseFloat(String((parsed as Partial<{ openapi: unknown }>).openapi)) === 3.1;

const OAS_MODEL_REGEXP = /((definitions|components)\/?(schemas)?)\//;

export function transformOasToServiceNode(apiDescriptionDocument: unknown) {
  if (isOas31(apiDescriptionDocument)) {
    return computeServiceNode(
      { ...apiDescriptionDocument, jsonSchemaDialect: 'http://json-schema.org/draft-07/schema#' },
      oas3SourceMap,
      transformOas3Service,
      transformOas3Operation,
    );
  }
  if (isOas3(apiDescriptionDocument)) {
    return computeServiceNode(apiDescriptionDocument, oas3SourceMap, transformOas3Service, transformOas3Operation);
  } else if (isOas2(apiDescriptionDocument)) {
    return computeServiceNode(apiDescriptionDocument, oas2SourceMap, transformOas2Service, transformOas2Operation);
  }

  return null;
}

function computeServiceNode(
  document: Spec | OpenAPIObject,
  map: ISourceNodeMap[],
  transformService: Oas2HttpServiceTransformer | Oas3HttpServiceTransformer,
  transformOperation: Oas2HttpOperationTransformer | Oas3HttpOperationTransformer,
) {
  const serviceDocument = transformService({ document });
  const serviceNode: ServiceNode = {
    type: NodeType.HttpService,
    uri: '/',
    name: serviceDocument.name,
    data: serviceDocument,
    tags: serviceDocument.tags?.map(tag => tag.name) || [],
    children: computeChildNodes(document, document, map, transformOperation),
    extensions: serviceDocument.extensions
  };

  return serviceNode;
}

function computeChildNodes(
  document: Spec | OpenAPIObject,
  data: unknown,
  map: ISourceNodeMap[],
  transformer: Oas2HttpOperationTransformer | Oas3HttpOperationTransformer,
  parentUri: string = '',
) {
  const nodes: ServiceChildNode[] = [];

  if (!isObject(data)) return nodes;

  for (const key of Object.keys(data)) {
    const sanitizedKey = encodePointerFragment(key);
    const match = findMapMatch(sanitizedKey, map);
    if (match) {
      const uri = `${parentUri}/${sanitizedKey}`;

      const jsonPath = pointerToPath(`#${uri}`);
      if (match.type === NodeTypes.Operation && jsonPath.length === 3) {
        const path = String(jsonPath[1]);
        const method = String(jsonPath[2]);
        const operationDocument = transformer({ document, path, method });
        let parsedUri;
        const encodedPath = String(encodePointerFragment(path));

        if (operationDocument.iid) {
          parsedUri = `/operations/${operationDocument.iid}`;
        } else {
          parsedUri = uri.replace(encodedPath, slugify(path));
        }

        nodes.push({
          type: NodeType.HttpOperation,
          uri: parsedUri,
          data: operationDocument,
          name: operationDocument.summary || operationDocument.iid || operationDocument.path,
          tags: operationDocument.tags?.map(tag => tag.name) || [],
        });
      } else if (match.type === NodeTypes.Model) {
        const schemaDocument = get(document, jsonPath);
        const parsedUri = uri.replace(OAS_MODEL_REGEXP, 'schemas/');

        nodes.push({
          type: NodeType.Model,
          uri: parsedUri,
          data: schemaDocument,
          name: schemaDocument.title || last(uri.split('/')) || '',
          tags: schemaDocument['x-tags'] || [],
        });
      }

      if (match.children) {
        nodes.push(...computeChildNodes(document, data[key], match.children, transformer, uri));
      }
    }
  }

  return nodes;
}

function findMapMatch(key: string | number, map: ISourceNodeMap[]): ISourceNodeMap | void {
  if (typeof key === 'number') return;
  for (const entry of map) {
    if (!!entry.match?.match(key) || (entry.notMatch !== void 0 && !entry.notMatch.match(key))) {
      return entry;
    }
  }
}

export function isJson(value: string) {
  try {
    JSON.parse(value);
  } catch (e) {
    return false;
  }
  return true;
}
