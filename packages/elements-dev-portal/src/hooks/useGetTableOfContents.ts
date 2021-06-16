import * as React from 'react';
import { useQuery } from 'react-query';

import { PlatformContext } from '../components/DevPortalProvider';
import { getTableOfContents } from '../handlers/getTableOfContents';

export function useGetTableOfContents({ projectId, branchSlug }: { projectId: string; branchSlug?: string }) {
  const { platformUrl, platformAuthToken } = React.useContext(PlatformContext);
  return useQuery(
    ['tableOfContents', projectId, branchSlug, platformUrl, platformAuthToken],
    () => getTableOfContents({ projectId, branchSlug, platformUrl, platformAuthToken }),
    { enabled: projectId ? true : false },
  );
}
