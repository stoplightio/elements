import { NodeType } from "@stoplight/types";
export declare type Node = NodeSummary & {
    data: any;
    links: {
        mock_url?: string;
        export_url?: string;
    };
    outbound_edges: NodeEdge[];
    inbound_edges: NodeEdge[];
};
export declare type NodeSummary = {
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
export declare type NodeEdge = {
    id: string;
    type: string;
    uri: string;
    slug: string;
    title: string;
};
export declare type NodeSearchResult = {
    uri: string;
    data: string;
    name: string;
    description: string;
    type: NodeType;
    tags: string[];
};
