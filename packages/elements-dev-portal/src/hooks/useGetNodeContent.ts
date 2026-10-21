import { useQuery } from '@tanstack/react-query';
import * as React from 'react';

import { PlatformContext } from '../components/DevPortalProvider';
import { devPortalCacheKeys } from '../consts';
import { getNodeContent } from '../handlers/getNodeContent';

export function useGetNodeContent({
  nodeSlug,
  projectId,
  branchSlug,
}: {
  nodeSlug: string;
  projectId: string;
  branchSlug?: string;
}) {
  const { platformUrl, platformAuthToken, isLoggedIn } = React.useContext(PlatformContext);

  return useQuery({
    queryKey: [...devPortalCacheKeys.branchNodeDetails(projectId, branchSlug ?? '', nodeSlug), platformUrl, isLoggedIn],
    queryFn: () => getNodeContent({ nodeSlug, projectId, branchSlug, platformUrl, platformAuthToken }),
    enabled: nodeSlug && projectId ? true : false,
  });
}
