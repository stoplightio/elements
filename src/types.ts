import { NodeType } from '@stoplight/types';

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
