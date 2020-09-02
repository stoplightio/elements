import { NodeType } from '@stoplight/types';

export interface ITableOfContents {
  items: TableOfContentItem[];
}

export type TableOfContentItem = Divider | Group | Item;

export type NodeData = {
  name: string;
  type: NodeType;
  tags: string[];
  uri: string;
};

export type Divider = {
  type: 'divider';
  title: string;
};

export type Group = {
  type: 'group';
  title: string;
  items: TableOfContentItem[];
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
