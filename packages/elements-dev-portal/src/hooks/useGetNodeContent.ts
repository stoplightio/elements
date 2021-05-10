import * as React from 'react';
import { useQuery } from 'react-query';

import { PlatformUrlContext } from '../components/Provider';
import { getNodeContent } from '../handlers/getNodeContent';

export function useGetNodeContent(
  {
    nodeSlug,
    projectId,
    branchSlug,
  }: {
    nodeSlug: string;
    projectId: string;
    branchSlug?: string;
  },
  requestHeaders?: Record<string, string>,
) {
  const platformUrl = React.useContext(PlatformUrlContext);

  return useQuery(['useNodeContent', nodeSlug, projectId, branchSlug, platformUrl], () =>
    getNodeContent({ nodeSlug, projectId, branchSlug, platformUrl }, requestHeaders),
  );
}
