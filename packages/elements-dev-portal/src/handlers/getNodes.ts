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
    const encodedProjectId = encodeURIComponent(projectIds[0]);
    const response = await fetch(`${platformUrl}/api/v1/projects/${encodedProjectId}`, {
      headers: {
        'Stoplight-Elements-Version': appVersion,
        ...(platformAuthToken && { Authorization: `Bearer ${platformAuthToken}` }),
      },
    });
    const data = await response.json();
    fetchedWorkspaceId = data.workspace.id;
  }

  if (projectIds && projectIds.length) {
    queryParams.push(
      ...projectIds.map((projectId, index) => {
        const encodedProjectId = encodeURIComponent(projectId);
        return `project_ids[${index}]=${encodedProjectId}`;
      }),
    );
  }

  if (search) {
    const encodedSearch = encodeURIComponent(search);
    queryParams.push(`search=${encodedSearch}`);
  }

  if (branchSlug) {
    const encodedBranchSlug = encodeURIComponent(branchSlug);
    queryParams.push(`branch=${encodedBranchSlug}`);
  }

  const query = queryParams.length ? `?${queryParams.join('&')}` : '';

  const encodedWorkspaceId = encodeURIComponent(fetchedWorkspaceId);
  const response = await fetch(`${platformUrl}/api/v1/workspaces/${encodedWorkspaceId}/nodes${query}`, {
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
