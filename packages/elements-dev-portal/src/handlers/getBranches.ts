import { Branch } from '../types';

export const getBranches = async ({
  projectId,
  platformUrl = 'https://stoplight.io',
  platformAuthToken,
}: {
  projectId: string;
  platformUrl?: string;
  platformAuthToken?: string;
}): Promise<Branch[]> => {
  const response = await fetch(`${platformUrl}/api/v1/projects/${projectId}/branches`, {
    headers: {
      'Stoplight-Elements-Version': '1.0.0',
      ...(platformAuthToken && { Authorization: `Bearer ${platformAuthToken}` }),
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data);
  }

  return data;
};
