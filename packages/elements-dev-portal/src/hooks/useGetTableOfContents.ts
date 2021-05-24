import * as React from 'react';
import { useQuery } from 'react-query';

import { PlatformUrlContext } from '../components/DevPortalProvider';
import { getTableOfContents } from '../handlers/getTableOfContents';

export function useGetTableOfContents({ projectId, branchSlug }: { projectId: string; branchSlug?: string }) {
  const platformUrl = React.useContext(PlatformUrlContext);
  return useQuery(
    ['tableOfContents', projectId, branchSlug, platformUrl],
    () => getTableOfContents({ projectId, branchSlug, platformUrl }),
    { enabled: projectId ? true : false },
  );
}
