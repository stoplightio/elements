import {NodeType} from "@stoplight/types";

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

export type NodeSearchResult = {
  uri: string;
  data: string;
  name: string;
  type: NodeType;
};

