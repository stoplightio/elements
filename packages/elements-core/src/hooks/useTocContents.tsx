import * as React from 'react';

import { HttpMethodColors } from '../constants';
import { ITableOfContentsTree, TableOfContentItem, TableOfContentsLinkWithId } from '../types';

export const MARKDOWN_REGEXP = /\/?\w+\.md$/;
export const MODEL_REGEXP = /schemas\//;
export const OPERATION_REGEXP = /\/operations\/.+|paths\/.+\/(get|post|put|patch|delete|head|options|trace)$/;

type OperationMap = Record<string, string | undefined>;

/**
 * Memoized hook that provides Toc contents by parsing a tree
 */
export function useTocContents(tree: ITableOfContentsTree, operationMap?: OperationMap) {
  return React.useMemo(() => computeToc(tree.items, { operationMap }), [tree, operationMap]);
}

/**
 * Build ToC array from tree items
 */

function computeToc(
  items: TableOfContentItem[],
  {
    operationMap,
    parentId,
    depth = 0,
  }: {
    operationMap?: OperationMap;
    parentId?: string;
    depth?: number;
  },
): TableOfContentsLinkWithId[] {
  // There is a chance that we pass an empty array
  if (!items.length) return [];

  let contents: TableOfContentsLinkWithId[] = [];

  for (const nodeIndex in items) {
    if (!items[nodeIndex]) continue;
    const tocNode = items[nodeIndex];

    const id = parentId ? `${parentId}-${nodeIndex}` : nodeIndex;
    if (tocNode.type === 'divider') {
      contents.push({
        id,
        name: tocNode.title,
        depth,
        type: tocNode.type,
      });
    }

    if (tocNode.type === 'group') {
      contents.push({
        id,
        name: tocNode.title,
        depth,
        type: tocNode.type,
        ...(tocNode.uri && { icon: 'cloud', to: tocNode.uri, startExpanded: true }),
      });

      if (tocNode.items.length) {
        contents.push(...computeToc(tocNode.items, { operationMap, parentId: id, depth: depth + 1 }));
      }
    }

    if (tocNode.type === 'item') {
      const operation = getOperationForUri(tocNode.uri, operationMap);
      const isModel =
        MODEL_REGEXP.test(tocNode.uri) ||
        (!MARKDOWN_REGEXP.test(tocNode.uri) && !operation && tocNode.title !== 'Overview');

      contents.push({
        id,
        name: tocNode.title,
        depth: depth,
        type: tocNode.type,
        iconPosition: 'right',
        ...(operation && {
          textIcon: operation.toUpperCase(),
          iconColor: HttpMethodColors[operation],
        }),
        ...(isModel && { icon: 'cube', iconColor: 'orange' }),
        to: tocNode.uri,
      });
    }
  }

  return contents;
}

function getOperationForUri(uri: string, operationMap?: OperationMap) {
  if (operationMap) {
    return operationMap[uri];
  } else {
    const match = OPERATION_REGEXP.exec(uri);
    return match && match.length === 2 ? match[1] : undefined;
  }
}
