import { NodeType } from '@stoplight/types';
import { IconName } from '@stoplight/ui-kit';
import { IContentsNode } from '@stoplight/ui-kit/TableOfContents/types';

export interface INodeFilter {
  nodeUri?: string;
  nodeType?: string;
}

export interface IBranchNode {
  id: number;
  baseUri: string;
  version: string;
  isLatestVersion: boolean;

  node: {
    id: number;
    uri: string;
  };

  snapshot: {
    id: number;
    name: string;
    type: string;
    data: unknown;
    tagNames?: string[];
  };

  branch: {
    id: number;
    slug: string;

    project: {
      id: number;
      slug: string;

      workspace: {
        id: number;
        slug: string;
      };
    };
  };
}

export interface IContentsNodeWithId extends IContentsNode {
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

  toBranchNodeId: number;
  toBranchNodeName: string;
  toBranchNodeType: string;
  toBranchNodeUri: string;
  toBranchNodePath: string;
}

export type IconMapType = NodeType | 'group' | 'divider' | 'item';
export type NodeIconMapping = { [type in IconMapType]?: IconName };
