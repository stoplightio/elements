import * as React from 'react';
import { useQuery } from 'react-query';

import { PlatformContext } from '../components/DevPortalProvider';
import { getBranches } from '../handlers/getBranches';

export function useGetBranches({ projectId }: { projectId: string }) {
  const { platformUrl, authToken } = React.useContext(PlatformContext);
  return useQuery(
    ['branches', projectId, platformUrl, authToken],
    () => getBranches({ projectId, platformUrl, authToken }),
    {
      enabled: projectId ? true : false,
    },
  );
}
