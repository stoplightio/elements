import { Workspace } from '../types';
import { appVersion } from '../version';

export const getWorkspace = async ({
  projectIds,
  platformUrl = 'https://stoplight.io',
  platformAuthToken,
}: {
  projectIds: string[];
  platformUrl?: string;
  platformAuthToken?: string;
}): Promise<Workspace> => {
  const response = await fetch(`${platformUrl}/api/v1/projects/${projectIds[0]}`, {
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
