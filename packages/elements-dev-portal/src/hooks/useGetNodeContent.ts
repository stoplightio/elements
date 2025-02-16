import * as React from 'react';
import { useQuery } from 'react-query';

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

  return useQuery(
    [...devPortalCacheKeys.branchNodeDetails(projectId, branchSlug ?? '', nodeSlug), platformUrl, isLoggedIn],
    () => getNodeContent({ nodeSlug, projectId, branchSlug, platformUrl, platformAuthToken }),
    { enabled: nodeSlug && projectId ? true : false },
  );
}
