import { JsonPath, NodeType } from '@stoplight/types';
import { IconName } from '@stoplight/ui-kit';
import { IContentsNode } from '@stoplight/ui-kit/TableOfContents/types';
import { Edge, Node } from 'vis';
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

export interface IDiagnostic {
  location: { uri: string; jsonPath?: JsonPath };
  message: string;
}

export interface INodeInfo<D = unknown> {
  id: number;
  type: NodeType;
  name: string;
  srn: string;
  data: D;

  errors?: IDiagnostic[];
  changes?: IChange[];
  version?: string;
  versions?: string[];
  tags?: string[];
}

export interface IProjectNode {
  type: NodeType;
  srn: string;
  name: string;
  id: number | string;

  latestVersion?: string;
  versions?: string[];
  tags?: string[];
  data?: string;
  summary?: string;
}

export interface IContentsNodeWithId extends IContentsNode {
  id: number | string;
}

export type ProjectNodeWithUri = IProjectNode & { uri: string };

export type IconMapType = NodeType | 'group' | 'divider' | 'item';
export type NodeIconMapping = { [type in IconMapType]?: IconName };

export type DocsNodeType = NodeType | 'json_schema' | 'http';

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

export interface IVisGraph {
  nodes: Node[];
  edges: Edge[];
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
