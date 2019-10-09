import { NodeType } from '@stoplight/types';
export { IComponentMapping } from '@stoplight/markdown-viewer';

export interface IDeserializedSrn {
  service: string;
  org: string;
  project: string;
  uri: string;
}

export interface INodeInfo {
  id: number;
  type: NodeType;
  name: string;
  srn: string;
  version: string;
  versions: string[];
  data: any;
}

export interface IProjectNode {
  id: number | string;
  type: NodeType;
  name: string;
  srn: string;
  version?: string;
  versions?: string[];
  tags?: string[];
}

export type ProjectNodeWithUri = IProjectNode & { uri: string };

export interface IContentsNode {
  name: string;
  depth: number;
  srn?: string;
  type?: 'divider' | 'group';
}

export type DocsNodeType = NodeType | 'json_schema' | 'http';
