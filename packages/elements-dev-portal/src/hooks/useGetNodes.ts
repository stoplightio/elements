import { keepPreviousData, useQuery } from '@tanstack/react-query';
import * as React from 'react';
import { useDebounce } from 'use-debounce';

import { PlatformContext } from '../components/DevPortalProvider';
import { devPortalCacheKeys } from '../consts';
import { getNodes } from '../handlers/getNodes';

export function useGetNodes({
  search,
  workspaceId,
  projectIds,
  branch,
  pause,
}: {
  search: string;
  workspaceId?: string;
  projectIds?: string[];
  branch?: string;
  pause?: boolean;
}) {
  const { platformUrl, platformAuthToken, isLoggedIn } = React.useContext(PlatformContext);
  const [debounceSearch] = useDebounce(search, 500);
  return useQuery({
    queryKey: [
      ...devPortalCacheKeys.searchNodes({ projectIds, branchSlug: branch, workspaceId, search: debounceSearch }),
      platformUrl,
      isLoggedIn,
    ],
    queryFn: () =>
      getNodes({ workspaceId, projectIds, branchSlug: branch, search: debounceSearch, platformUrl, platformAuthToken }),
    enabled: !pause,
    placeholderData: keepPreviousData,
  });
}
