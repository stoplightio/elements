import { Icon } from '@blueprintjs/core';
import { ScrollContainer } from '@stoplight/ui-kit/ScrollContainer';
import cn from 'classnames';
import * as React from 'react';
import { ComponentsContext } from '../containers/Provider';
import { IContentsNode } from '../types';

export interface ITableOfContents {
  contents: IContentsNode[];
  srn?: string;
  className?: string;
}

export const TableOfContents: React.FunctionComponent<ITableOfContents> = ({ contents, srn, className }) => {
  // TODO (CL): Should we store expanded state in local storage?
  const [expanded, setExpanded] = React.useState({});

  // Whenever the SRN changes, make sure the parent is expanded
  // TODO (CL): Handle deeply nested expanding
  React.useEffect(() => {
    if (!srn) return;

    const index = contents.findIndex(item => item.srn && item.srn === srn);
    if (index === -1 || !contents[index] || contents[index].depth === 0) return;

    const parentIndex = findParentIndex(contents[index].depth, contents.slice(0, index));
    if (parentIndex > -1 && !expanded[parentIndex]) {
      setExpanded({ ...expanded, [parentIndex]: true });
    }
  }, [srn]);

  return (
    <div className={cn('TableOfContents bg-gray-1 dark:bg-transparent flex justify-end', className)}>
      <div className="w-full">
        <ScrollContainer>
          <div className="TableOfContents-inner py-10 ml-auto">
            {contents.map((item, index) => {
              const isActive = item.srn ? srn === item.srn : false;

              if (item.depth > 0) {
                // Check if we should show this item
                const parentIndex = findParentIndex(item.depth, contents.slice(0, index));
                if (parentIndex > -1 && !expanded[parentIndex]) {
                  return null;
                }
              }

              const isParent = contents[index + 1] ? contents[index + 1].depth > item.depth : false;
              const isExpanded = expanded[index];
              const isDivider = !isParent && !item.srn;

              return (
                <TableOfContentsItem
                  key={index}
                  name={item.name}
                  srn={item.srn}
                  depth={item.depth}
                  isActive={isActive}
                  isParent={isParent}
                  isExpanded={isExpanded}
                  isDivider={isDivider}
                  onClick={e => {
                    if (isDivider) {
                      e.preventDefault();
                      return;
                    }

                    if (!isParent) return;

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
};

interface ITableOfContentsItem {
  depth: number;
  name: string;
  srn?: string;
  isActive: boolean;
  isParent: boolean;
  isExpanded: boolean;
  isDivider: boolean;
  onClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
}
const TableOfContentsItem: React.FunctionComponent<ITableOfContentsItem> = ({
  depth,
  name,
  srn,
  isActive,
  isParent,
  isExpanded,
  isDivider,
  onClick,
}) => {
  const Components = React.useContext(ComponentsContext);
  const href = !isParent && !isDivider && srn;
  const className = cn('relative flex items-center cursor-pointer border border-transparent border-r-0 ', {
    'dark:text-white': !isActive,
  });

  const children: any = (
    <>
      <span className="TableOfContentsItem-name flex-1">{name}</span>

      {isParent && <Icon className="TableOfContentsItem-icon" icon={isExpanded ? 'chevron-down' : 'chevron-right'} />}
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
  } else {
    item = (
      <a className={className} href={href || ''}>
        {children}
      </a>
    );
  }

  return (
    <div
      className={cn('TableOfContentsItem border-l border-transparent', {
        'TableOfContentsItem--active border-l-0': isActive,
        'TableOfContentsItem--group': isParent,
        'TableOfContentsItem--divider': isDivider,
        'TableOfContentsItem--child border-gray-3 dark:border-darken-4': depth > 0,
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
