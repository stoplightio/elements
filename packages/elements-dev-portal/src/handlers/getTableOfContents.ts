import { ProjectTableOfContents } from '../types';

export const getTableOfContents = async ({
  projectId,
  branchSlug,
  platformUrl = 'https://stoplight.io',
  authToken,
}: {
  projectId: string;
  branchSlug?: string;
  platformUrl?: string;
  authToken?: string;
}): Promise<ProjectTableOfContents> => {
  const branchQuery = branchSlug ? `?branch=${branchSlug}` : '';
  const response = await fetch(`${platformUrl}/api/v1/projects/${projectId}/table-of-contents${branchQuery}`, {
    headers: {
      'Stoplight-Elements-Version': '1.0.0',
      ...(authToken && { Authorization: `Bearer ${authToken}` }),
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data);
  }
  return data;
};
