import * as React from 'react';
import { useQuery } from 'react-query';

import { PlatformUrlContext } from '../components/DevPortalProvider';
import { getBranches } from '../handlers/getBranches';

export function useGetBranches({ projectId }: { projectId: string }) {
  const platformUrl = React.useContext(PlatformUrlContext);
  return useQuery(['branches', projectId, platformUrl], () => getBranches({ projectId, platformUrl }), {
    enabled: projectId ? true : false,
  });
}
