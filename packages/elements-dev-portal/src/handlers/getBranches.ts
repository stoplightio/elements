import { Branch } from '../types';
import { appVersion } from '../version';

export const getBranches = async ({
  projectId,
  platformUrl = 'https://stoplight.io',
  platformAuthToken,
}: {
  projectId: string;
  platformUrl?: string;
  platformAuthToken?: string;
}): Promise<Branch[]> => {
  const encodedProjectId = encodeURIComponent(projectId);
  const response = await fetch(`${platformUrl}/api/v1/projects/${encodedProjectId}/branches`, {
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
