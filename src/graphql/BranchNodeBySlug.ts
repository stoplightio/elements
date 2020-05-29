import { NodeType } from '@stoplight/types';

export const elementsBranchNode = `
query ElementsBranchNodeBySlug($workspaceSlug: String!, $projectSlug: String!, $branchSlug: String, $uri: String!) {
  elementsBranchNode(projectSlug: $projectSlug, uri: $uri, workspaceSlug: $workspaceSlug, branchSlug: $branchSlug) {
    id
    data
    type
    name
    uri
  }
}
`;

export type ElementsBranchNode = {
  __typename?: 'ElementsBranchNode';
  id: number;
  data: string;
  type: NodeType;
  name: string;
  uri: string;
};
