import { Oas2HttpOperationTransformer, Oas3HttpOperationTransformer } from '@stoplight/http-spec/oas/types';
import { pointerToPath } from '@stoplight/json';
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
  Number.parseInt(String((parsed as Partial<{ openapi: unknown }>).openapi)) >= 3;

export const MODEL_REGEXP = new RegExp('^/(definitions|components/schemas)');
export const OPERATION_REGEXP = new RegExp('^/paths');

const MODEL_TAG_PATH = ['x-tags', 0];
const OPERATION_TAG_PATH = ['tags', 0, 'name'];

export interface IUriMap {
  [uri: string]: any;
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
    for (const key in data) {
      const sanitizedKey = key.replace(/~/g, '~0').replace(/\//g, '~1');
      const match = findMapMatch(sanitizedKey, map);
      if (match) {
        const uri = `${parentUri || ''}/${sanitizedKey}`;

        const jsonPath = pointerToPath(`#${uri}`);
        if (match.type === NodeTypes.Operation) {
          const path = jsonPath[1].toString();
          const method = jsonPath[2].toString();
          uriMap[uri] = transformer({ document, path, method });
        }
        if (match.type === NodeTypes.Model) {
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
  for (const entry of map) {
    let match = true;

    let target = key;

    if (entry.match) {
      match = target && typeof target === 'string' ? !!target.match(entry.match) : false;
    } else if (entry.notMatch) {
      match = target && typeof target === 'string' ? !!!target.match(entry.notMatch) : true;
    }

    if (match) return entry;
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
        return typeof tag === 'string' ? tag.toLowerCase() : void 0;
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

const mapModel = (uri: string) =>
  ({
    title: last(uri.split('/')),
    type: 'item',
    uri,
  } as TableOfContentItem);

const mapOperation = (uriMap: IUriMap) => (uri: string) => {
  const operation = uriMap[uri];
  return {
    title: isObject(operation) ? operation['summary'] || operation['path'] : void 0,
    type: 'item',
    uri,
  } as TableOfContentItem;
};
