import { NodeSearchResult } from '../interfaces/node';

export const getNodes = async (
  {
    workspaceId,
    projectIds,
    search,
    platformUrl = 'https://stoplight.io',
  }: {
    workspaceId: string;
    search?: string;
    projectIds?: string[];
    platformUrl?: string;
  },
  requestHeaders?: Record<string, string>,
): Promise<NodeSearchResult[]> => {
  const queryParams = [];
  if (projectIds && projectIds.length) {
    queryParams.push(...projectIds.map(projectId => `project_ids=${projectId}`));
  }
  if (search) {
    queryParams.push(`search=${search}`);
  }
  const query = queryParams.length ? `?${queryParams.join('&')}` : '';

  const response = await fetch(`${platformUrl}/api/v1/workspaces/${workspaceId}/nodes${query}`, {
    headers: requestHeaders,
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data);
  }

  return data;
};
