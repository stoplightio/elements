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
  uri: string;
  srn: IDeserializedSrn;
  version: string;
  versions: string[];
  summary: string;
  data: any;
}

export interface IProjectNode {
  id: number;
  type: NodeType;
  name: string;
  srn: IDeserializedSrn;
  version: string;
  versions: string[];
  tags?: string[];
}

export interface IContentsNode {
  name: string;
  depth: number;
  srn?: string;
}
