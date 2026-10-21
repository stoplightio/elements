import { useQuery } from '@tanstack/react-query';
import * as React from 'react';

import { PlatformContext } from '../components/DevPortalProvider';
import { devPortalCacheKeys } from '../consts';
import { getBranches } from '../handlers/getBranches';

export function useGetBranches({ projectId }: { projectId: string }) {
  const { platformUrl, platformAuthToken, isLoggedIn } = React.useContext(PlatformContext);
  return useQuery({
    queryKey: [...devPortalCacheKeys.branchesList(projectId), platformUrl, isLoggedIn],
    queryFn: () => getBranches({ projectId, platformUrl, platformAuthToken }),
    enabled: projectId ? true : false,
  });
}
