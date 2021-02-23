import { Group, isDivider, isGroup, ITableOfContents } from './types';

function cleanDividers(group: Group) {
  group.items = group.items.filter(item => !isDivider(item));
  group.items.filter(isGroup).forEach(cleanDividers);
}

export function cleanToc(toc: ITableOfContents) {
  toc.items.filter(isGroup).forEach(cleanDividers);
}
