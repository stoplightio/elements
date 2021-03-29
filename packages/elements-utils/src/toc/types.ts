import { NodeType } from '@stoplight/types';

export type NodeData = {
  type: NodeType;
  name: string;
  tags: string[];
  uri: string;
};

export interface ITableOfContents {
  items: TableOfContentItem[];
}

export type TableOfContentItem = Divider | Group | Item;

export type TocItemType = 'divider' | 'group' | 'item';

export type Divider = {
  type: 'divider';
  title: string;
};

export type Group = {
  type: 'group';
  title: string;
  items: TableOfContentItem[];
  uri?: string;
};

export type Item = {
  type: 'item';
  title: string;
  uri: string;
};

export function isItem(item: TableOfContentItem): item is Item {
  return item.type === 'item';
}

export function isGroup(item: TableOfContentItem): item is Group {
  return item.type === 'group';
}

export function isDivider(item: TableOfContentItem): item is Divider {
  return item.type === 'divider';
}
