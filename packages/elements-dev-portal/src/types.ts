import { TableOfContentsItem } from '@stoplight/elements-core';

export type Branch = {
  id: number;
  slug: string;
  is_default: boolean;
  is_published: boolean;
  name?: string;
};

export type Branches = {
  items: Branch[];
};

export type ProjectTableOfContents = {
  items: TableOfContentsItem[];
  hide_powered_by?: boolean;
  collapseTableOfContents?: boolean;
};

export type Node = NodeSummary & {
  data: any;
  links: {
    mock_url?: string;
    /**
     * @deprecated use export_original_file_url instead
     */
    export_url?: string;
    /**
     * The URL to export the original file. This is not a bundled output, meaning references are left in place.
     */
    export_original_file_url?: string;
    /**
     * The URL to export a bundled form of the file. Bundling means references are copied into the output file.
     */
    export_bundled_file_url?: string;
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
