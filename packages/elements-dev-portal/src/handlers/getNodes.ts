import { NodeSearchResult } from '../types';
import { appVersion } from '../version';

export const getNodes = async ({
  workspaceId,
  branchSlug,
  projectIds,
  search,
  platformUrl = 'https://stoplight.io',
  platformAuthToken,
}: {
  workspaceId?: string;
  branchSlug?: string;
  projectIds?: string[];
  search?: string;
  platformUrl?: string;
  platformAuthToken?: string;
}): Promise<NodeSearchResult[]> => {
  const queryParams = [];
  let fetchedWorkspaceId = workspaceId || '';

  if (!workspaceId && projectIds?.length) {
    const response = await fetch(`${platformUrl}/api/v1/projects/${projectIds[0]}`, {
      headers: {
        'Stoplight-Elements-Version': appVersion,
        ...(platformAuthToken && { Authorization: `Bearer ${platformAuthToken}` }),
      },
    });
    const data = await response.json();
    fetchedWorkspaceId = data.workspace.id;
  }

  if (projectIds && projectIds.length) {
    queryParams.push(...projectIds.map((projectId, index) => `project_ids[${index}]=${projectId}`));
  }

  if (search) {
    queryParams.push(`search=${search}`);
  }

  if (branchSlug) {
    queryParams.push(`branchSlug=${branchSlug}`);
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
