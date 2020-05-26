import { NodeType } from '@stoplight/types';

export const BranchNodeBySlug = `
query ElementsBranchNodeBySlug($workspaceSlug: String!, $projectSlug: String!, $branchSlug: String, $uri: String!) {
  id
  snapshot_data
  snapshot_type
}
`;

export type ElementsBranchNode = {
  __typename?: 'ElementsBranchNode';
  data: string;
  id: number;
  name: string;
  type: NodeType;
  uri: string;
};
