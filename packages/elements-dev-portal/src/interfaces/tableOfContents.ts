import { TableOfContentsItem } from '@stoplight/elements-core/components/MosaicTableOfContents/types';

export type TableOfContents = {
  items: TableOfContentsItem[];
  hide_powered_by?: boolean;
};
