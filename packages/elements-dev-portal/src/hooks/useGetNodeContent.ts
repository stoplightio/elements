import * as React from 'react';
import { useQuery } from 'react-query';

import { PlatformUrlContext } from '../components/DevPortalProvider';
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
  const platformUrl = React.useContext(PlatformUrlContext);

  return useQuery(
    ['useNodeContent', nodeSlug, projectId, branchSlug, platformUrl],
    () => getNodeContent({ nodeSlug, projectId, branchSlug, platformUrl }),
    { enabled: nodeSlug && projectId ? true : false },
  );
}
