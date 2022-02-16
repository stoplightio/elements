import * as React from 'react';
import { useQuery } from 'react-query';

import { PlatformContext } from '../components/DevPortalProvider';
import { devPortalCacheKeys } from '../consts';
import { getTableOfContents } from '../handlers/getTableOfContents';

export function useGetTableOfContents({ projectId, branchSlug }: { projectId: string; branchSlug?: string }) {
  const { platformUrl, platformAuthToken } = React.useContext(PlatformContext);
  return useQuery(
    [...devPortalCacheKeys.branchTOC(projectId, branchSlug ?? ''), platformUrl, platformAuthToken],
    () => getTableOfContents({ projectId, branchSlug, platformUrl, platformAuthToken }),
    { enabled: projectId ? true : false },
  );
}
