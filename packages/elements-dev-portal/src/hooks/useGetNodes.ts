import { devPortalCacheKeys } from '@stoplight/elements-dev-portal/consts';
import * as React from 'react';
import { useQuery } from 'react-query';
import { useDebounce } from 'use-debounce';

import { PlatformContext } from '../components/DevPortalProvider';
import { getNodes } from '../handlers/getNodes';

export function useGetNodes({
  search,
  workspaceId,
  projectIds,
  pause,
}: {
  search: string;
  workspaceId?: string;
  projectIds?: string[];
  pause?: boolean;
}) {
  const { platformUrl, platformAuthToken } = React.useContext(PlatformContext);
  const [debounceSearch] = useDebounce(search, 500);
  return useQuery(
    [
      ...devPortalCacheKeys.searchNodes({ projectIds, workspaceId, search: debounceSearch }),
      platformUrl,
      platformAuthToken,
    ],
    () => getNodes({ workspaceId, projectIds, search: debounceSearch, platformUrl, platformAuthToken }),
    { enabled: !pause, keepPreviousData: true },
  );
}
