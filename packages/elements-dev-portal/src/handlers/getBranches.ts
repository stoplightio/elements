import { version } from '../../package.json';
import { Branch } from '../types';

export const getBranches = async ({
  projectId,
  platformUrl = 'https://stoplight.io',
}: {
  projectId: string;
  platformUrl?: string;
}): Promise<Branch[]> => {
  const response = await fetch(`${platformUrl}/api/v1/projects/${projectId}/branches`, {
    headers: {
      'Stoplight-Elements-Version': version,
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data);
  }

  return data;
};
