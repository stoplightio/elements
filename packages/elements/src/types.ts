import type { Dictionary, NodeType } from '@stoplight/types';
import type { FAIconProp, ITableOfContentsLink } from '@stoplight/ui-kit';

export interface INodeFilter {
  nodeUri?: string;
  nodeType?: string;
}

export interface IChange {
  message: string;
  createdAt: string;
  // TODO: generate graphql types, so we can set this as an enum.
  semver: string;
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

export interface INodeEdge {
  id: number;
  depth: number;
  type: string;

  fromBranchNodeId: number;
  fromBranchNodeName: string;
  fromBranchNodeType: string;
  fromBranchNodeUri: string;
  fromBranchNodePath: string;
  fromBranchNodeVersion: string;

  toBranchNodeId: number;
  toBranchNodeName: string;
  toBranchNodeType: string;
  toBranchNodeUri: string;
  toBranchNodePath: string;
  toBranchNodeVersion: string;
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

export interface IRouter {
  basePath?: string;
  router?: 'history' | 'hash' | 'memory';
}
export interface ILinkComponent {
  linkComponent?: React.ComponentType<ILinkComponentProps>;
}

export interface ILinkComponentProps {
  data?: Dictionary<unknown>;
  url: string;
}

export interface IStoplightProject extends IRouter, ILinkComponent {
  workspace: string;
  project: string;
  branch?: string;
  authToken?: string;
}
