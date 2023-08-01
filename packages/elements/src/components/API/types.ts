import type { OperationNode } from '../../utils/oas/types';

export type TagGroup = { title: string; items: OperationNode[] };

export type XTagGroup = {
  name: string;
  tags: string[];
};

export type XTagGroupExtension = Record<string, XTagGroup>;

export type DocumentationOverride = {
  [iid: string]: string;
};

export interface ComputeAPITreeConfig {
  hideSchemas?: boolean;
  hideInternal?: boolean;
  customDocs?: DocumentationOverride;
}
