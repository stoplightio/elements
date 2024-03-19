import * as React from 'react';
import { useQuery } from 'react-query';

import { PlatformContext } from '../components/DevPortalProvider';
import { devPortalCacheKeys } from '../consts';
import { getBranches } from '../handlers/getBranches';

export function useGetBranches({ projectId }: { projectId: string }) {
  const { platformUrl, platformAuthToken, isLoggedIn } = React.useContext(PlatformContext);
  return useQuery(
    [...devPortalCacheKeys.branchesList(projectId), platformUrl, isLoggedIn],
    () => getBranches({ projectId, platformUrl, platformAuthToken }),
    {
      enabled: projectId ? true : false,
    },
  );
}
