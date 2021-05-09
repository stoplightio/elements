export type Node = NodeSummary & {
  data: string;
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
    name: string;
    summary: string;
    data: string;
  };
  project_slug: string;
  project_name: string;
};