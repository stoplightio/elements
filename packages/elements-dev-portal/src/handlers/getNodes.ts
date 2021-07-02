import { NodeSearchResult } from '../types';
import { appVersion } from '../version';

export const getNodes = async ({
  workspaceId,
  projectIds,
  search,
  platformUrl = 'https://stoplight.io',
  platformAuthToken,
}: {
  workspaceId: string;
  search?: string;
  projectIds?: string[];
  platformUrl?: string;
  platformAuthToken?: string;
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
      'Stoplight-Elements-Version': appVersion,
      ...(platformAuthToken && { Authorization: `Bearer ${platformAuthToken}` }),
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data);
  }

  return data;
};
