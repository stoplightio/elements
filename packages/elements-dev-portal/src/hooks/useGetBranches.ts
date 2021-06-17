import * as React from 'react';
import { useQuery } from 'react-query';

import { PlatformContext } from '../components/DevPortalProvider';
import { getBranches } from '../handlers/getBranches';

export function useGetBranches({ projectId }: { projectId: string }) {
  const { platformUrl, platformAuthToken } = React.useContext(PlatformContext);
  return useQuery(
    ['branches', projectId, platformUrl, platformAuthToken],
    () => getBranches({ projectId, platformUrl, platformAuthToken }),
    {
      enabled: projectId ? true : false,
    },
  );
}
