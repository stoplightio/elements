import { useQuery } from '@tanstack/react-query';
import * as React from 'react';

import { PlatformContext } from '../components/DevPortalProvider';
import { devPortalCacheKeys } from '../consts';
import { getTableOfContents } from '../handlers/getTableOfContents';

export function useGetTableOfContents({ projectId, branchSlug }: { projectId: string; branchSlug?: string }) {
  const { platformUrl, platformAuthToken, isLoggedIn } = React.useContext(PlatformContext);
  return useQuery({
    queryKey: [...devPortalCacheKeys.branchTOC(projectId, branchSlug ?? ''), platformUrl, isLoggedIn],
    queryFn: () => getTableOfContents({ projectId, branchSlug, platformUrl, platformAuthToken }),
    // Here projectId cHJqOjA is an encoded value of zero,
    // hence avoiding the graphql call for invalid project id
    enabled: projectId && projectId !== 'cHJqOjA' ? true : false,
  });
}
