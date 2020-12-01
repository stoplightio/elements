import { ITableOfContents as UiKitITableOfContents, TableOfContents as UIKitTableOfContents } from '@stoplight/ui-kit';
import * as React from 'react';

import { TableOfContentsSkeleton } from '../components/TableOfContents/Skeleton';
import { usePlatformApi } from '../hooks/usePlatformApi';
import { useTocContents } from '../hooks/useTocContents';
import { ITableOfContentsTree, TableOfContentsLinkWithId } from '../types';

export type ITableOfContents<E> = {
  workspaceSlug: string;
  projectSlug: string;
  platformUrl?: string;
  branchSlug?: string;
  nodeUri?: string;
  onData?: (tocTree: ITableOfContentsTree) => void;
  className?: string;
  authToken?: string;
} & Pick<UiKitITableOfContents<TableOfContentsLinkWithId, E>, 'rowComponent' | 'rowComponentExtraProps'>;

const tocUri = 'api/v1/projects/{workspaceSlug}/{projectSlug}/table-of-contents';

export function TableOfContents<E>({
  workspaceSlug,
  platformUrl,
  projectSlug,
  branchSlug,
  nodeUri,
  onData,
  className,
  authToken,
  ...extra
}: ITableOfContents<E>) {
  const { data: tocData, error } = usePlatformApi<ITableOfContentsTree>(
    tocUri,
    {
      platformUrl,
      workspaceSlug,
      projectSlug,
      branchSlug,
      authToken,
    },
    {
      type: 'custom',
    },
  );

  React.useEffect(() => {
    if (tocData) {
      onData?.(tocData);
    }
  }, [onData, tocData]);

  const tree = tocData ?? { items: [] };

  const contents: TableOfContentsLinkWithId[] = useTocContents(tree).map(item => {
    return {
      ...item,
      isActive: item.type === 'item' && nodeUri !== void 0 ? item.to === nodeUri : false,
    };
  });

  if (!tocData && !error) {
    return <TableOfContentsSkeleton className={className} />;
  }

  // any: unfortunately the typings for extra props break for some reason. Can't seem to figure out why, but I believe the behavior is valid.
  return <UIKitTableOfContents className={className} contents={contents} {...(extra as any)} />;
}
