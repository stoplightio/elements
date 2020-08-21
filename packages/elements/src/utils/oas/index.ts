import { Oas2HttpOperationTransformer, Oas3HttpOperationTransformer } from '@stoplight/http-spec/oas/types';
import { encodePointerFragment, pointerToPath } from '@stoplight/json';
import { compact, get, isObject, last, uniq } from 'lodash';
import { OpenAPIObject } from 'openapi3-ts';
import { Spec } from 'swagger-schema-official';

import { ITableOfContentsTree, TableOfContentItem } from '../../types';
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

const MODEL_TAG_PATH = ['x-tags', 0];
const OPERATION_TAG_PATH = ['tags', 0, 'name'];

export interface IUriMap {
  [uri: string]: unknown;
}

interface ITagUriMap {
  [tag: string]: string[];
}

interface IComputeUriMapProps {
  document: Spec | OpenAPIObject;
  data: unknown;
  map: ISourceNodeMap[];
  transformer: Oas2HttpOperationTransformer | Oas3HttpOperationTransformer;
  parentUri?: string;
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

export const computeTocTree = (uriMap: IUriMap) => {
  const items: TableOfContentItem[] = [];
  const uris = Object.keys(uriMap);
  const httpService = uriMap['/'];
  const operationUris = uris.filter(uri => OPERATION_REGEXP.test(uri));
  const modelUris = uris.filter(uri => MODEL_REGEXP.test(uri));

  const tags = uniq(
    compact(
      Object.values(uriMap).map(node => {
        const tag = get(node, OPERATION_TAG_PATH) || get(node, MODEL_TAG_PATH);
        return typeof tag === 'string' ? tag : void 0;
      }),
    ),
  );

  const tagUriMap: ITagUriMap = tags.reduce(
    (obj, tag) => ({
      ...obj,
      [tag]: [
        ...modelUris.filter(uri => get(uriMap[uri], MODEL_TAG_PATH) === tag),
        ...operationUris.filter(uri => get(uriMap[uri], OPERATION_TAG_PATH) === tag),
      ],
    }),
    {},
  );

  const noTagUris = [
    ...modelUris.filter(uri => !tags.includes(get(uriMap[uri], MODEL_TAG_PATH))),
    ...operationUris.filter(uri => !tags.includes(get(uriMap[uri], OPERATION_TAG_PATH))),
  ];

  if (httpService && isObject(httpService)) {
    items.push(
      {
        title: httpService['name'],
        type: 'divider',
      },
      {
        title: 'Overview',
        type: 'item',
        uri: '/',
      },
    );
  }
  if (tags.length) {
    items.push(
      ...tags.map(
        tag =>
          ({
            title: tag,
            type: 'group',
            items: [
              ...modelUris.filter(uri => tagUriMap[tag].includes(uri)).map(mapModel),
              ...operationUris.filter(uri => tagUriMap[tag].includes(uri)).map(mapOperation(uriMap)),
            ],
          } as TableOfContentItem),
      ),
    );
  }
  if (noTagUris.length) {
    items.push({
      title: 'Others',
      type: 'group',
      items: [
        ...modelUris.filter(uri => noTagUris.includes(uri)).map(mapModel),
        ...operationUris.filter(uri => noTagUris.includes(uri)).map(mapOperation(uriMap)),
      ],
    });
  }

  return {
    items,
  } as ITableOfContentsTree;
};

const mapModel = (uri: string): TableOfContentItem => ({
  title: last(uri.split('/')) ?? '',
  type: 'item',
  uri,
});

const mapOperation = (uriMap: IUriMap) => (uri: string): TableOfContentItem => {
  const operation = uriMap[uri];
  return {
    title: isObject(operation) ? operation['summary'] || operation['path'] : '',
    type: 'item',
    uri,
  };
};
