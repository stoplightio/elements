import { NodeType } from '@stoplight/types';
import { IconName } from '@stoplight/ui-kit';
import { IContentsNode } from '@stoplight/ui-kit/TableOfContents/types';
export { IComponentMapping } from '@stoplight/markdown-viewer';

export interface IDeserializedSrn {
  service: string;
  org: string;
  project: string;
  uri: string;
}

export interface IChange {
  createdAt: string;
  semver: string;
  message: string;
}

export interface INodeInfo {
  data: any;
  type: NodeType;
  srn: string;
  name: string;

  changes?: IChange[];
  id?: number | string;
  version?: string;
  versions?: string[];
  tags?: string[];
}

export interface IProjectNode {
  type: NodeType;
  srn: string;
  name: string;
  id: number | string;

  version?: string;
  versions?: string[];
  tags?: string[];
}

export interface IContentsNodeWithId extends IContentsNode {
  id: number | string;
}

export type ProjectNodeWithUri = IProjectNode & { uri: string };

export type IconMapType = NodeType | 'group' | 'divider' | 'item';
export type NodeIconMapping = { [type in IconMapType]?: IconName };

export type DocsNodeType = NodeType | 'json_schema' | 'http';

export interface IVisGraphNode {
  id: string;
  label: string;
  color?: string;
  font?: {
    color?: string;
  };
}

export interface IVisGraphEdge {
  to: string;
  from: string;
  title: string;
  label?: string;
  color?: string;
  font?: {
    align: string;
  };
}

export interface IVisGraph {
  nodes: IVisGraphNode[];
  edges: IVisGraphEdge[];
}

export interface IPageHeading {
  id: string;
  title: string;
  depth: number;
}

export interface IPaginatedResponse<T> {
  items: T[];
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
    endCursor: string;
  };
  totalCount: number;
}
