import * as React from 'react';
import { TableOfContents as TableOfContentsComponent } from '../components/TableOfContents';
import { TableOfContentsSkeleton } from '../components/TableOfContents/Skeleton';
import { useProjectNodes } from '../hooks/useProjectNodes';

export interface ITableOfContents {
  srn: string;

  group?: string;
  activeNodeSrn?: string;
  className?: string;
  padding?: string;
  isOpen?: boolean;
  onClose?: () => void;
  enableDrawer?: boolean | number;
}

export const TableOfContents: React.FunctionComponent<ITableOfContents> = ({
  srn,

  group,
  className,
  padding = '12',
  isOpen,
  onClose,
  enableDrawer,
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
    <TableOfContentsComponent
      className={className}
      items={data.items}
      padding={padding}
      srn={srn}
      isOpen={isOpen}
      onClose={onClose}
      enableDrawer={enableDrawer}
    />
  );
};
