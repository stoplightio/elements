import { ProjectTableOfContents } from '../types';

export const getTableOfContents = async ({
  projectId,
  branchSlug,
  platformUrl = 'https://stoplight.io',
  platformAuthToken,
}: {
  projectId: string;
  branchSlug?: string;
  platformUrl?: string;
  platformAuthToken?: string;
}): Promise<ProjectTableOfContents> => {
  const branchQuery = branchSlug ? `?branch=${branchSlug}` : '';
  const response = await fetch(`${platformUrl}/api/v1/projects/${projectId}/table-of-contents${branchQuery}`, {
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
