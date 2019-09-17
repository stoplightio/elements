import { Button, Drawer } from '@blueprintjs/core';
import * as React from 'react';
import { TableOfContents as TableOfContentsComponent } from '../components/TableOfContents';
import { TableOfContentsSkeleton } from '../components/TableOfContentsSkeleton';
import { useIsMobile } from '../hooks/useIsMobile';
import { useProjectNodes } from '../hooks/useProjectNodes';

export interface ITableOfContents {
  srn: string;
  activeNodeSrn?: string;
  className?: string;
  padding?: string;
  title?: string;
  isOpen?: boolean;
}

export const TableOfContents: React.FunctionComponent<ITableOfContents> = ({
  srn,
  className,
  padding = '10',
  title,
  isOpen = false,
}) => {
  const { isLoading, error, data } = useProjectNodes(srn);
  const isMobile = useIsMobile();

  const setIsOpen = React.useCallback(() => {
    isOpen = false;
  }, [isOpen]);

  if (error) {
    console.error(error);
    return <>Error loading resource. Check the developer console for more information.</>;
  }

  if (!data) {
    return <>Not Found</>;
  }

  const comp = isLoading ? (
    <TableOfContentsSkeleton className={className} padding={padding} />
  ) : (
    <TableOfContentsComponent className={className} items={data.items} padding={padding} srn={srn} />
  );

  if (isMobile) {
    return (
      <Drawer isOpen={isOpen} onClose={() => setIsOpen} position="left" size="330px">
        <div className="flex flex-1 flex-col">
          <Button className="flex justify-start ml-10" icon={'arrow-left'} minimal onClick={() => setIsOpen}>
            {title ? title : 'Stoplight'}
          </Button>
          <div className="h-full flex justify-end">{comp}</div>
        </div>
      </Drawer>
    );
  }

  return comp;
};
