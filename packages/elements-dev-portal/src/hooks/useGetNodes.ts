import * as React from 'react';
import { useQuery } from 'react-query';
import { useDebounce } from 'use-debounce';

import { PlatformContext } from '../components/DevPortalProvider';
import { getNodes } from '../handlers/getNodes';

export function useGetNodes({
  search,
  workspaceId,
  branchSlug,
  projectIds,
  pause,
}: {
  search: string;
  workspaceId?: string;
  branchSlug?: string;
  projectIds?: string[];
  pause?: boolean;
}) {
  const { platformUrl, platformAuthToken } = React.useContext(PlatformContext);
  const [debounceSearch] = useDebounce(search, 500);
  return useQuery(
    ['workspaceNodes', workspaceId, branchSlug, projectIds, debounceSearch, platformUrl, platformAuthToken],
    () => getNodes({ workspaceId, branchSlug, projectIds, search: debounceSearch, platformUrl, platformAuthToken }),
    { enabled: !pause },
  );
}
