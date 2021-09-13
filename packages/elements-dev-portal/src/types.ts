import { TableOfContentsItem } from '@stoplight/elements-core';

export type Branch = {
  id: number;
  slug: string;
  is_default: boolean;
  is_published: boolean;
  projectId: number;
  name?: string;
};

export type ProjectTableOfContents = {
  items: TableOfContentsItem[];
  hide_powered_by?: boolean;
};

export type Node = NodeSummary & {
  data: any;
  links: {
    mock_url?: string;
    export_url?: string;
  };
  outbound_edges: NodeEdge[];
  inbound_edges: NodeEdge[];
};

export type NodeSummary = {
  id: string;
  type: string;
  uri: string;
  slug: string;
  title: string;
  summary: string;
  project_id: string;
  branch_id: string;
  branch_node_id: number;
  branch: string;
};

export type NodeEdge = {
  id: string;
  type: string;
  uri: string;
  slug: string;
  title: string;
};

export type NodeSearchResult = NodeSummary & {
  highlighted: {
    name: string | null;
    summary: string | null;
    data: string | null;
  };
  project_slug: string;
  project_name: string;
  node_id: number;
};

export type Workspace = {
  id: string;
  name: string;
  slug: string;
  default_branch_id: string;
  workspace: {
    id: string;
    name: string;
    slug: string;
  };
};
