import * as React from 'react';

import {
  ITableOfContents as IITableOfContentsComponent,
  TableOfContents as TableOfContentsComponent,
} from '../components/TableOfContents';
import { TableOfContentsSkeleton } from '../components/TableOfContents/Skeleton';
import { useProjectNodes } from '../hooks/useProjectNodes';

export interface ITableOfContents extends Omit<IITableOfContentsComponent, 'items' | 'contents'> {
  srn: string;

  group?: string;
  activeNodeSrn?: string;
  className?: string;
  padding?: string;
}

export const TableOfContents: React.FunctionComponent<ITableOfContents> = ({
  srn,

  group,
  className,
  padding = '12',

  ...tocProps
}) => {
  const { isLoading, error, data } = useProjectNodes(srn, { group });

  if (isLoading) {
    return <TableOfContentsSkeleton className={className} padding={padding} />;
  }

  if (error) {
    console.error(error);
    return <>Error loading resource. Check the developer console for more information.</>;
  }

  if (!data) {
    return <>Not Found</>;
  }

  return (
    <TableOfContentsComponent className={className} items={data.items} padding={padding} srn={srn} {...tocProps} />
  );
};
