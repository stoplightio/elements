import * as React from 'react';
import { useQuery } from 'react-query';

import { PlatformContext } from '../components/DevPortalProvider';
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
  const { platformUrl, platformAuthToken } = React.useContext(PlatformContext);

  return useQuery(
    ['useNodeContent', nodeSlug, projectId, branchSlug, platformUrl, platformAuthToken],
    () => getNodeContent({ nodeSlug, projectId, branchSlug, platformUrl, platformAuthToken }),
    { enabled: nodeSlug && projectId ? true : false },
  );
}
