import * as React from 'react';
import { useQuery } from 'react-query';
import { useDebounce } from 'use-debounce';

import { PlatformContext } from '../components/DevPortalProvider';
import { getNodes } from '../handlers/getNodes';

export function useGetNodes({
  search,
  projectIds,
  workspaceId,
}: {
  search: string;
  workspaceId?: string;
  projectIds?: string[];
}) {
  const { platformUrl, platformAuthToken } = React.useContext(PlatformContext);
  const [debounceSearch] = useDebounce(search, 500);
  return useQuery(['workspaceNodes', workspaceId, projectIds, debounceSearch, platformUrl, platformAuthToken], () =>
    getNodes({ workspaceId, projectIds, search: debounceSearch, platformUrl, platformAuthToken }),
  );
}
