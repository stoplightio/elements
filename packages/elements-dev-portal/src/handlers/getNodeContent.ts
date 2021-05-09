import { Node } from '../interfaces/node';

export const getNodeContent = async (
  {
    nodeSlug,
    projectId,
    branchSlug,
    platformUrl = 'https://stoplight.io',
  }: {
    nodeSlug: string;
    projectId: string;
    branchSlug?: string;
    platformUrl?: string;
  },
  requestHeaders?: Record<string, string>,
): Promise<Node> => {
  const nodeId = getNodeIdFromSlug(nodeSlug);
  const branchQuery = branchSlug ? `?branch=${branchSlug}` : '';
  const response = await fetch(`${platformUrl}/api/v1/projects/${projectId}/nodes/${nodeId}${branchQuery}`, {
    headers: requestHeaders,
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data);
  }

  return data;
};

function getNodeIdFromSlug(nodeSlug: string) {
  const [nodeId] = nodeSlug.split('-');
  return nodeId;
}
