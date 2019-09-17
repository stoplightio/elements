import { Icon } from '@blueprintjs/core';
import { Button, Drawer } from '@blueprintjs/core';
import { ScrollContainer } from '@stoplight/ui-kit/ScrollContainer';
import cn from 'classnames';
import * as React from 'react';
import { ComponentsContext } from '../containers/Provider';
import { useComputeToc } from '../hooks/useComputeToc';
import { useIsMobile } from '../hooks/useIsMobile';
import { IContentsNode, IProjectNode } from '../types';

export interface ITableOfContents {
  // List of items that will be computed into the tree structure
  items?: IProjectNode[];

  // Optionally pass in a precomputed list of nodes instead of items. This is useful if you want to customize the ordering of the tree.
  contents?: IContentsNode[];

  // SRN of the active node
  srn?: string;

  // Padding that will be used for (default: 10)
  padding?: string;
  className?: string;

  // Title of project
  title?: string;

  // Controls for the drawer functionality on mobile
  openDrawer?: boolean;
  onCloseDrawer?: () => void;
}

export const TableOfContents: React.FunctionComponent<ITableOfContents> = ({
  contents: _contents,
  items = [],
  srn,
  className,
  padding = '10',
  title,
  openDrawer = false,
  // tslint:disable-next-line: no-empty
  onCloseDrawer = () => {},
}) => {
  const hasContents = _contents && _contents.length;

  // If contents are passed in, we still need to run this memoized function
  let contents = useComputeToc(hasContents ? [] : items);
  if (_contents && hasContents) {
    // The contents prop takes priority over items
    contents = _contents;
  }

  // TODO (CL): Should we store expanded state in local storage?
  const [expanded, setExpanded] = React.useState({});

  // Whenever the SRN changes, make sure the parent is expanded
  // TODO (CL): Handle deeply nested expanding
  React.useEffect(() => {
    if (!srn) return;

    // Get the index of the currently active item
    const index = contents.findIndex(item => item.srn && item.srn === srn);
    if (index === -1 || !contents[index] || contents[index].depth === 0) return;

    const parentIndex = findParentIndex(contents[index].depth, contents.slice(0, index));
    if (parentIndex > -1 && !expanded[parentIndex]) {
      setExpanded({ ...expanded, [parentIndex]: true });
    }
  }, [srn]);

  // Controls mobile functionality
  const isMobile = useIsMobile();

  const comp = (
    <div className={cn('TableOfContents bg-gray-1 dark:bg-transparent flex justify-end h-full', className)}>
      <div className="w-full">
        <ScrollContainer>
          <div className={cn('TableOfContents__inner ml-auto', `py-${padding}`)}>
            {contents.map((item, index) => {
              const isActive = item.srn ? srn === item.srn : false;

              if (item.depth > 0) {
                // Check if we should show this item
                const parentIndex = findParentIndex(item.depth, contents.slice(0, index));
                if (parentIndex > -1 && !expanded[parentIndex]) {
                  return null;
                }
              }

              const isGroup = item.type === 'group';
              const isDivider = item.type === 'divider';
              const isExpanded = expanded[index];

              return (
                <TableOfContentsItem
                  key={index}
                  name={item.name}
                  srn={item.srn}
                  depth={item.depth}
                  isActive={isActive}
                  isGroup={isGroup}
                  isExpanded={isExpanded}
                  isDivider={isDivider}
                  onClick={e => {
                    if (isDivider) {
                      e.preventDefault();
                      return;
                    }

                    if (!isGroup) return;

                    e.preventDefault();
                    setExpanded({ ...expanded, [String(index)]: !isExpanded });
                  }}
                />
              );
            })}
          </div>
        </ScrollContainer>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer isOpen={openDrawer} onClose={() => onCloseDrawer()} position="left" size="330px">
        <div className="flex flex-1 flex-col bg-gray-1 dark:bg-transparent">
          <div className="border-b dark:border-lighten-4 h-20 py-6 px-2 bg-white">
            <Button className="flex justify-start text-lg" icon={'arrow-left'} minimal onClick={() => onCloseDrawer()}>
              {title ? title : 'Stoplight'}
            </Button>
          </div>
          <div className="h-full flex justify-end">{comp}</div>
        </div>
      </Drawer>
    );
  }

  return comp;
};

interface ITableOfContentsItem {
  depth: number;
  name: string;
  srn?: string;
  isActive: boolean;
  isGroup: boolean;
  isExpanded: boolean;
  isDivider: boolean;
  onClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
}
const TableOfContentsItem: React.FunctionComponent<ITableOfContentsItem> = ({
  depth,
  name,
  srn,
  isActive,
  isGroup,
  isExpanded,
  isDivider,
  onClick,
}) => {
  const Components = React.useContext(ComponentsContext);
  const href = !isGroup && !isDivider && srn;
  const isChild = !isGroup && depth > 0;

  const className = cn('TableOfContentsItem__inner relative flex items-center border border-transparent border-r-0', {
    'dark-hover:bg-lighten-2 hover:bg-darken-2 cursor-pointer': !isDivider,
    'text-gray-5 dark:text-gray-5': isDivider || (isChild && !isActive),
    'text-primary bg-white border-darken-3 dark:bg-lighten-2 dark:border-lighten-4': isActive,
    'dark:text-white': !isDivider && !isChild && !isActive,
  });

  const children: any = (
    <>
      <span className="TableOfContentsItem__name flex-1 truncate">{name}</span>

      {isGroup && <Icon className="TableOfContentsItem__icon" icon={isExpanded ? 'chevron-down' : 'chevron-right'} />}
    </>
  );

  let item;
  if (href && Components && Components.link) {
    item = Components.link(
      {
        node: { url: href, title: name, className },
        children,
        parent: null,
        path: [],
        defaultComponents: {},
      },
      srn || name,
    );
  } else if (isDivider) {
    item = <div className={className}>{children}</div>;
  } else {
    item = (
      <a className={className} href={href || ''}>
        {children}
      </a>
    );
  }

  return (
    <div
      className={cn('TableOfContentsItem border-transparent', {
        'border-l': !isActive && !isGroup,
        'TableOfContentsItem--active': isActive,
        'TableOfContentsItem--group': isGroup,
        'TableOfContentsItem--divider': isDivider,
        'TableOfContentsItem--child border-gray-3 dark:border-lighten-3': isChild,
      })}
      style={{
        marginLeft: depth * 16,
      }}
      onClick={onClick}
    >
      <div className="-ml-px">{item}</div>
    </div>
  );
};

/**
 * Traverses contents backwards to find the first index with a lower depth
 */
function findParentIndex(currentDepth: number, contents: IContentsNode[]) {
  for (let index = contents.length - 1; index >= 0; index--) {
    if (contents[index].depth === currentDepth - 1) {
      return String(index);
    }
  }

  return -1;
}
