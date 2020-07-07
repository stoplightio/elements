import * as React from 'react';

import { IconsContext } from '../containers/Provider';
import type {
  Divider,
  Group,
  ITableOfContentsTree,
  Item,
  NodeIconMapping,
  TableOfContentItem,
  TableOfContentsLinkWithId,
} from '../types';

/**
 * Memoized hook that computes a tree structure from an array of nodes
 */
export function useComputeToc(tree: ITableOfContentsTree) {
  const icons = React.useContext(IconsContext);
  return React.useMemo(() => computeToc(tree.items, null, 0, icons), [tree, icons]);
}

function isDivider(item: TableOfContentItem): item is Divider {
  return 'title' in item && !('uri' in item || 'items' in item);
}

function isGroup(item: TableOfContentItem): item is Group {
  return 'title' in item && 'items' in item && !('uri' in item);
}

function isItem(item: TableOfContentItem): item is Item {
  return 'title' in item && 'uri' in item;
}

/**
 * Sorts project nodes into a flat array
 */

export function computeToc(
  items: TableOfContentItem[],
  parentId: string | null,
  depth: number,
  icons: NodeIconMapping,
): TableOfContentsLinkWithId[] {
  // There is a chance that we pass an empty array
  if (!items.length) return [];

  let contents: TableOfContentsLinkWithId[] = [];

  for (const nodeIndex in items) {
    if (!items[nodeIndex]) continue;
    const tocNode = items[nodeIndex];

    const id = parentId ? `${parentId}-${nodeIndex}` : nodeIndex;
    if (isDivider(tocNode)) {
      contents.push({
        id,
        name: tocNode.title,
        depth,
        type: 'divider',
      });
    }

    if (isGroup(tocNode)) {
      contents.push({
        id,
        name: tocNode.title,
        depth,
        type: 'group',
        icon: icons.group,
      });

      if (tocNode.items.length) {
        contents.push(...computeToc(tocNode.items, id, depth + 1, icons));
      }
    }

    if (isItem(tocNode)) {
      contents.push({
        id,
        name: tocNode.title,
        depth: depth,
        type: 'item',
        icon: icons.item,
        to: tocNode.uri,
      });
    }
  }

  return contents;
}
