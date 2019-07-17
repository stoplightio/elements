import { ITreeListIcon } from '@stoplight/tree-list';
import { Dictionary, NodeType } from '@stoplight/types';
import { IconName } from '@stoplight/ui-kit';

export interface IGraphNode {
  id: number;
  type: NodeType;
  name: string;
  uri: string;
  srn: string;
  version: string;
  summary: string;
  data: any;
}

export interface ITableOfContentsNode {
  id: number;
  type: NodeType;
  name: string;
  uri: string;
  srn: string;
  version: string;
  tags?: string[];
}

export const NodeTypeColors: Dictionary<string, NodeType> = {
  http_operation: '#6a6acb',
  http_service: '#e056fd',
  article: '#399da6',
  model: '#ef932b',
  http_server: '',
  unknown: '',
};

export const NodeTypePrettyName: Dictionary<string, NodeType> = {
  http_operation: 'Endpoint',
  http_service: 'API',
  article: 'Article',
  model: 'Model',
  http_server: 'Server',
  unknown: '',
};

export const NodeTypeIcons: Dictionary<IconName, NodeType> = {
  http_operation: 'locate',
  http_service: 'cloud',
  article: 'manual',
  model: 'cube',
  http_server: 'database',
  unknown: 'help',
};

export type NodeSpec = 'json_schema' | 'markdown' | 'oas2_operation' | 'oas3_operation' | 'oas2' | 'oas3';

export const NodeSpecIcons: Dictionary<ITreeListIcon, NodeSpec> = {
  json_schema: {
    default: NodeTypeIcons.model,
    color: NodeTypeColors.model,
  },
  markdown: {
    default: NodeTypeIcons.article,
    color: NodeTypeColors.article,
  },
  oas2_operation: {
    default: NodeTypeIcons.http_operation,
    color: NodeTypeColors.http_operation,
  },
  oas3_operation: {
    default: NodeTypeIcons.http_operation,
    color: NodeTypeColors.http_operation,
  },
  oas2: {
    default: NodeTypeIcons.http_service,
    color: NodeTypeColors.http_service,
  },
  oas3: {
    default: NodeTypeIcons.http_service,
    color: NodeTypeColors.http_service,
  },
};
