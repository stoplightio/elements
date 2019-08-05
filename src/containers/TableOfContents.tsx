import * as React from 'react';
import { TableOfContents as TableOfContentsComponent } from '../components/TableOfContents';
import { TableOfContentsSkeleton } from '../components/TableOfContentsSkeleton';
import { useProjectNodes } from '../hooks/useProjectNodes';

export interface ITableOfContents {
  srn: string;
  activeNodeSrn?: string;
  className?: string;
  padding?: string;
}

export const TableOfContents: React.FunctionComponent<ITableOfContents> = ({ srn, className, padding = '10' }) => {
  const { isLoading, error, data } = useProjectNodes(srn);

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

  return <TableOfContentsComponent className={className} items={data.items} padding={padding} />;
};
