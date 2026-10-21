import { useQuery } from '@tanstack/react-query';
import * as React from 'react';

import { PlatformContext } from '../components/DevPortalProvider';
import { devPortalCacheKeys } from '../consts';
import { getWorkspace } from '../handlers/getWorkspace';

export function useGetWorkspace({ projectIds }: { projectIds: string[] }) {
  const { platformUrl, platformAuthToken } = React.useContext(PlatformContext);
  return useQuery({
    queryKey: [...devPortalCacheKeys.searchNodes({ projectIds }), platformUrl, platformAuthToken],
    queryFn: () => getWorkspace({ projectIds, platformUrl, platformAuthToken }),
  });
}
