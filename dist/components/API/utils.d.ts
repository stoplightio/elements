import { TableOfContentsItem } from '@stoplight/elements-core';
import { OperationNode, ServiceChildNode, ServiceNode } from '../../utils/oas/types';
export declare type TagGroup = {
    title: string;
    items: OperationNode[];
};
export declare const computeTagGroups: (serviceNode: ServiceNode) => {
    groups: TagGroup[];
    ungrouped: OperationNode[];
};
interface ComputeAPITreeConfig {
    hideSchemas?: boolean;
    hideInternal?: boolean;
}
export declare const computeAPITree: (serviceNode: ServiceNode, config?: ComputeAPITreeConfig) => TableOfContentsItem[];
export declare const findFirstNodeSlug: (tree: TableOfContentsItem[]) => string | void;
export declare const isInternal: (node: ServiceChildNode | ServiceNode) => boolean;
export {};
