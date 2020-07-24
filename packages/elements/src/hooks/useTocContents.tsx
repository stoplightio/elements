import * as React from 'react';

import { IconsContext } from '../containers/Provider';
import {
  Divider,
  Group,
  ITableOfContentsTree,
  Item,
  NodeIconMapping,
  TableOfContentItem,
  TableOfContentsLinkWithId,
  TocItemType,
} from '../types';

/**
 * Memoized hook that provides Toc contents by parsing a tree
 */
export function useTocContents(tree: ITableOfContentsTree) {
  const icons = React.useContext(IconsContext);
  return React.useMemo(() => computeToc(tree.items, null, 0, icons), [tree, icons]);
}

function isDivider(item: TableOfContentItem): item is Divider {
  return item.type === TocItemType.Divider;
}

function isGroup(item: TableOfContentItem): item is Group {
  return item.type === TocItemType.Group;
}

function isItem(item: TableOfContentItem): item is Item {
  return item.type === TocItemType.Item;
}

/**
 * Build ToC array from tree items
 */

function computeToc(
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
