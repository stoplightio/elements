import * as React from 'react';

import { IconsContext } from '../containers/Provider';
import { ITableOfContentsTree, NodeIconMapping, TableOfContentItem, TableOfContentsLinkWithId } from '../types';

/**
 * Memoized hook that provides Toc contents by parsing a tree
 */
export function useTocContents(tree: ITableOfContentsTree) {
  const icons = React.useContext(IconsContext);
  return React.useMemo(() => computeToc(tree.items, { icons }), [tree, icons]);
}

/**
 * Build ToC array from tree items
 */

function computeToc(
  items: TableOfContentItem[],
  {
    parentId,
    depth = 0,
    icons,
  }: {
    parentId?: string;
    depth?: number;
    icons: NodeIconMapping;
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
        icon: icons.group,
      });

      if (tocNode.items.length) {
        contents.push(...computeToc(tocNode.items, { parentId: id, depth: depth + 1, icons }));
      }
    }

    if (tocNode.type === 'item') {
      contents.push({
        id,
        name: tocNode.title,
        depth: depth,
        type: tocNode.type,
        icon: icons.item,
        to: tocNode.uri,
      });
    }
  }

  return contents;
}
