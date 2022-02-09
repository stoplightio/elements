import * as React from 'react';
import { useQuery } from 'react-query';

import { PlatformContext } from '../components/DevPortalProvider';
import { devPortalCacheKeys } from '../consts';
import { getWorkspace } from '../handlers/getWorkspace';

export function useGetWorkspace({ projectIds }: { projectIds: string[] }) {
  const { platformUrl, platformAuthToken } = React.useContext(PlatformContext);
  return useQuery([...devPortalCacheKeys.searchNodes({ projectIds }), platformUrl, platformAuthToken], () =>
    getWorkspace({ projectIds, platformUrl, platformAuthToken }),
  );
}
