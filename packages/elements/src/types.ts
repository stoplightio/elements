import type { Dictionary, NodeType } from '@stoplight/types';
import type { FAIconProp, ITableOfContentsLink } from '@stoplight/ui-kit';
import * as React from 'react';

export interface INodeFilter {
  nodeUri?: string;
  nodeType?: string;
}

export interface IBranchNode {
  id: number;
  version?: string;
  isLatestVersion?: boolean;

  node: {
    id: number;
    uri: string;
  };

  snapshot: {
    id: number;
    type: string;
    name: string;
    summary?: string | null;
    data?: unknown;
    tagNames?: string[];
  };
}

export interface TableOfContentsLinkWithId extends ITableOfContentsLink {
  id: number | string;
}

export interface INodeGraph {
  nodes: IGraphNode[];
  edges: IGraphEdge[];
}

export interface IGraphNode {
  groupNodeId: number;
  name: string;
  srn: string;
  uri: string;
  depth: number;
  type: NodeType | string;
  version: string;

  projectName: string;
  groupSlug: string;
}

export interface IGraphEdge {
  fromGroupNodeId: number;
  fromPath: string;
  toGroupNodeId: number;
  toPath: string;
}

export type IconMapType = NodeType | 'group' | 'divider' | 'item';
export type NodeIconMapping = { [type in IconMapType]?: FAIconProp };

export interface ITableOfContentsTree {
  items: TableOfContentItem[];
}

export type TableOfContentItem = Divider | Group | Item;

export type TocItemType = 'divider' | 'group' | 'item';

export type Divider = {
  title: string;
  type: 'divider';
};

export type Group = {
  title: string;
  type: 'group';
  items: TableOfContentItem[];
};

export type Item = {
  title: string;
  type: 'item';
  uri: string;
};

export interface RoutingProps {
  basePath?: string;
  router?: 'history' | 'hash' | 'memory';
}

export type LinkComponentType = React.ComponentType<ILinkComponentProps>;

export interface ILinkComponentProps {
  data?: Dictionary<unknown>;
  url: string;
}
