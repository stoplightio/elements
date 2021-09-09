import { NodeSearchResult } from '../types';
import { appVersion } from '../version';

export const getNodes = async ({
  projectIds,
  workspaceId,
  search,
  platformUrl = 'https://stoplight.io',
  platformAuthToken,
}: {
  projectIds: string[];
  workspaceId?: string;
  search?: string;
  platformUrl?: string;
  platformAuthToken?: string;
}): Promise<NodeSearchResult[]> => {
  const queryParams = [];
  let fetchedWorkspaceId = workspaceId || '';

  if (!workspaceId) {
    const response = await fetch(`${platformUrl}/api/v1/projects/${projectIds[0]}`, {
      headers: {
        'Stoplight-Elements-Version': appVersion,
        ...(platformAuthToken && { Authorization: `Bearer ${platformAuthToken}` }),
      },
    });
    const data = await response.json();
    fetchedWorkspaceId = data.workspace.id;
  }

  queryParams.push(...projectIds.map((projectId, index) => `project_ids[${index}]=${projectId}`));

  if (search) {
    queryParams.push(`search=${search}`);
  }

  const query = queryParams.length ? `?${queryParams.join('&')}` : '';

  const response = await fetch(`${platformUrl}/api/v1/workspaces/${fetchedWorkspaceId}/nodes${query}`, {
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
