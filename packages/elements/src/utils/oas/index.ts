import { Oas2HttpOperationTransformer, Oas3HttpOperationTransformer } from '@stoplight/http-spec/oas/types';
import { pointerToPath } from '@stoplight/json';
import { get, isObject, last } from 'lodash';

import { ITableOfContentsTree, TableOfContentItem, TocItemType } from '../../types';
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

export interface IUriMap {
  [uri: string]: any;
}

interface IComputeUriMapProps {
  document: any;
  data: any;
  map: ISourceNodeMap[];
  transformer: Oas2HttpOperationTransformer | Oas3HttpOperationTransformer;
  parentUri?: string;
}

export function computeUriMap({ document, data, map, transformer, parentUri }: IComputeUriMapProps): IUriMap {
  const uriMap: IUriMap = {};

  switch (typeof data) {
    case 'object':
      for (const key in data) {
        if (!Object.prototype.hasOwnProperty.call(data, key)) {
          continue;
        }
        const sanitizedKey = key.replace(/~/g, '~0').replace(/\//g, '~1');
        const match = findMapMatch(sanitizedKey, data[key], map);
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

      break;
  }

  return uriMap;
}

function findMapMatch(key: string | number, value: any, map: ISourceNodeMap[]): ISourceNodeMap | void {
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

  if (httpService && isObject(httpService)) {
    items.push(
      {
        title: httpService['name'],
        type: TocItemType.Divider,
      },
      {
        title: 'Overview',
        type: TocItemType.Item,
        uri: '/',
      },
    );
  }
  if (operationUris.length) {
    items.push({
      title: 'Operations',
      type: TocItemType.Group,
      items: operationUris.map(uri => {
        const operation = uriMap[uri];
        return {
          title: isObject(operation) ? operation['summary'] || operation['path'] : void 0,
          type: TocItemType.Item,
          uri,
        } as TableOfContentItem;
      }),
    });
  }
  if (modelUris.length) {
    items.push({
      title: 'Models',
      type: TocItemType.Group,
      items: modelUris.map(
        uri =>
          ({
            title: last(uri.split('/')),
            type: TocItemType.Item,
            uri,
          } as TableOfContentItem),
      ),
    });
  }

  return {
    items,
  } as ITableOfContentsTree;
};
