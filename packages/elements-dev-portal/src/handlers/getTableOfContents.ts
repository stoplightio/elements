import { TableOfContents } from '../interfaces/tableOfContents';

export const getTableOfContents = async (
  {
    projectId,
    branchSlug,
    platformUrl = 'https://stoplight.io',
  }: {
    projectId: string;
    branchSlug?: string;
    platformUrl?: string;
  },
  requestHeaders?: Record<string, string>,
): Promise<TableOfContents> => {
  const branchQuery = branchSlug ? `?branch=${branchSlug}` : '';
  const response = await fetch(`${platformUrl}/api/v1/projects/${projectId}/table-of-contents${branchQuery}`, {
    headers: requestHeaders,
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data);
  }
  return data;
};
