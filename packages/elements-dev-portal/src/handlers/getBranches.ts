import { Branch } from '../interfaces/branch';

export const getBranches = async (
  {
    projectId,
    platformUrl = 'https://stoplight.io',
  }: {
    projectId: string;
    platformUrl?: string;
  },
  requestHeaders?: Record<string, string>,
): Promise<Branch[]> => {
  const response = await fetch(`${platformUrl}/api/v1/projects/${projectId}/branches`, { headers: requestHeaders });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data);
  }

  return data;
};
