import * as React from 'react';
import { useQuery } from 'react-query';
import { useDebounce } from 'use-debounce';

import { PlatformContext } from '../components/DevPortalProvider';
import { devPortalCacheKeys } from '../consts';
import { getNodes } from '../handlers/getNodes';

export function useGetNodes({
  search,
  workspaceId,
  projectIds,
  branchSlug,
  pause,
}: {
  search: string;
  workspaceId?: string;
  projectIds?: string[];
  branchSlug?: string;
  pause?: boolean;
}) {
  const { platformUrl, platformAuthToken } = React.useContext(PlatformContext);
  const [debounceSearch] = useDebounce(search, 500);
  return useQuery(
    [
      ...devPortalCacheKeys.searchNodes({ projectIds, branchSlug, workspaceId, search: debounceSearch }),
      platformUrl,
      platformAuthToken,
    ],
    () => getNodes({ workspaceId, projectIds, branchSlug, search: debounceSearch, platformUrl, platformAuthToken }),
    { enabled: !pause, keepPreviousData: true },
  );
}
