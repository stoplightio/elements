export const BranchNodeBySlug = `
query ElementsBranchNodeBySlug($workspaceSlug: String!, $projectSlug: String!, $branchSlug: String!, $uri: String!) {
  branchNodes(
    limit: 1,
    where: {
      _or: [
        { baseUri: { _eq: $uri } },
        { node: { uri: { _eq: $uri } } }
      ], 
      
      branch: {
        slug: { _eq: $branchSlug }, 
      	project: {
        	slug: { _eq: $projectSlug },
        	workspace: { slug: { _eq: $workspaceSlug } }
        }
      }
    }
  ) {
    id

    node {
      id
      uri
    }

    snapshot {
      id
      name
      type
      data
    }
  }
}
`;
