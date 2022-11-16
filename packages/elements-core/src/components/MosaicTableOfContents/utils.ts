import {
  TableOfContentsDivider,
  TableOfContentsExternalLink,
  TableOfContentsGroup,
  TableOfContentsGroupItem,
  TableOfContentsItem,
  TableOfContentsNode,
  TableOfContentsNodeGroup,
  TableOfContentsTagGroups,
} from './types';

export function getHtmlIdFromItemId(id: string) {
  return `sl-toc-${id}`;
}

export function isGroupOpenByDefault(
  depth: number,
  item: TableOfContentsGroup | TableOfContentsNodeGroup,
  activeId?: string,
  maxDepthOpenByDefault: number = 0,
) {
  return (
    depth < maxDepthOpenByDefault ||
    (activeId &&
      (('slug' in item && activeId === item.slug) ||
        ('id' in item && activeId === item.id) ||
        hasActiveItem(item.items, activeId)))
  );
}

// Recursively checks for the active item
export function hasActiveItem(items: TableOfContentsGroupItem[], activeId: string): boolean {
  return items.some(item => {
    if ('slug' in item && activeId === item.slug) {
      return true;
    }

    if ('id' in item && activeId === item.id) {
      return true;
    }

    if ('items' in item) {
      return hasActiveItem(item.items, activeId);
    }

    return false;
  });
}

// Recursively finds the first node
export function findFirstNode(items: TableOfContentsItem[]): TableOfContentsNode | TableOfContentsNodeGroup | void {
  for (const item of items) {
    // ignore nodes with empty slug
    if ((isNode(item) || isNodeGroup(item)) && item.slug) {
      return item;
    }

    if (isGroup(item) || isNodeGroup(item)) {
      const firstNode = findFirstNode(item.items);
      if (firstNode) {
        return firstNode;
      }
    }

    continue;
  }

  return;
}

export function isDivider(item: TableOfContentsItem): item is TableOfContentsDivider {
  return Object.keys(item).length === 1 && 'title' in item;
}
export function isGroup(item: TableOfContentsItem): item is TableOfContentsGroup {
  return Object.keys(item).length === 2 && 'title' in item && 'items' in item;
}
export function isNodeGroup(item: TableOfContentsItem): item is TableOfContentsNodeGroup {
  return 'title' in item && 'items' in item && 'slug' in item && 'id' in item && 'meta' in item && 'type' in item;
}
export function isNode(item: TableOfContentsItem): item is TableOfContentsNode {
  return 'title' in item && 'slug' in item && 'id' in item && 'meta' in item && 'type' in item;
}
export function isExternalLink(item: TableOfContentsItem): item is TableOfContentsExternalLink {
  return Object.keys(item).length === 2 && 'title' in item && 'url' in item;
}
export function isTagGroup(item: TableOfContentsItem): item is TableOfContentsTagGroups{
  return 'title' in item && 'items' in item && 'type' in item && item["type"] === "tagGroup"
}
