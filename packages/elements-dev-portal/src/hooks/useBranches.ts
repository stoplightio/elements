import * as React from 'react';
import { useQuery } from 'react-query';

import { PlatformUrlContext } from '../components/Provider';
import { getBranches } from '../handlers/getBranches';

export function useBranches(
  {
    projectId,
  }: {
    projectId: string;
  },
  requestHeaders?: Record<string, string>,
) {
  const platformUrl = React.useContext(PlatformUrlContext);
  return useQuery(['branches', projectId, platformUrl], () => getBranches({ projectId, platformUrl }, requestHeaders));
}
