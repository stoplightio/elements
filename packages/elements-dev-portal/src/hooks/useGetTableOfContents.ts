import * as React from 'react';
import { useQuery } from 'react-query';

import { PlatformContext } from '../components/DevPortalProvider';
import { getTableOfContents } from '../handlers/getTableOfContents';

export function useGetTableOfContents({ projectId, branchSlug }: { projectId: string; branchSlug?: string }) {
  const { platformUrl, authToken } = React.useContext(PlatformContext);
  return useQuery(
    ['tableOfContents', projectId, branchSlug, platformUrl, authToken],
    () => getTableOfContents({ projectId, branchSlug, platformUrl, authToken }),
    { enabled: projectId ? true : false },
  );
}
