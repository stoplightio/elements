import { NodeType } from '@stoplight/types';
import { IconName } from '@stoplight/ui-kit';
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
  isActive?: boolean;
  href?: string;
  type?: 'divider' | 'group' | 'item';
  icon?: IconName;
}

export type IconMapType = NodeType | 'group' | 'divider' | 'item';
export type NodeIconMapping = { [type in IconMapType]?: IconName };
