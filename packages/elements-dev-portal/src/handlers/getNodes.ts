import { NodeSearchResult } from '../types';

export const getNodes = async ({
  workspaceId,
  projectIds,
  search,
  platformUrl = 'https://stoplight.io',
}: {
  workspaceId: string;
  search?: string;
  projectIds?: string[];
  platformUrl?: string;
}): Promise<NodeSearchResult[]> => {
  const queryParams = [];

  if (projectIds && projectIds.length) {
    queryParams.push(...projectIds.map((projectId, index) => `project_ids[${index}]=${projectId}`));
  }

  if (search) {
    queryParams.push(`search=${search}`);
  }

  const query = queryParams.length ? `?${queryParams.join('&')}` : '';

  const response = await fetch(`${platformUrl}/api/v1/workspaces/${workspaceId}/nodes${query}`, {
    headers: {
      'Stoplight-Elements-Version': '1.0.0',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data);
  }

  return data;
};
