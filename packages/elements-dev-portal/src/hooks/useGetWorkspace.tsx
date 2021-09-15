import * as React from 'react';
import { useQuery } from 'react-query';

import { PlatformContext } from '../components/DevPortalProvider';
import { getWorkspace } from '../handlers/getWorkspace';

export function useGetWorkspace({ projectIds }: { projectIds: string[] }) {
  const { platformUrl, platformAuthToken } = React.useContext(PlatformContext);
  return useQuery(['useWorkspace', projectIds, platformUrl, platformAuthToken], () =>
    getWorkspace({ projectIds, platformUrl, platformAuthToken }),
  );
}
