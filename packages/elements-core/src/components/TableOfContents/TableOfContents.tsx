import { Box, Flex, Icon, ITextColorProps } from '@stoplight/mosaic';
import { HttpMethod, NodeType } from '@stoplight/types';
import * as React from 'react';
import { useState } from 'react';

import { useFirstRender } from '../../hooks/useFirstRender';
import { resolveRelativeLink } from '../../utils/string';
import { VersionBadge } from '../Docs/HttpOperation/Badges';
import {
  NODE_GROUP_ICON,
  NODE_GROUP_ICON_COLOR,
  NODE_META_COLOR,
  NODE_TYPE_ICON_COLOR,
  NODE_TYPE_META_ICON,
  NODE_TYPE_TITLE_ICON,
} from './constants';
import {
  ActiveItemContextType,
  CustomLinkComponent,
  TableOfContentsDivider,
  TableOfContentsGroup,
  TableOfContentsGroupItem,
  TableOfContentsItem,
  TableOfContentsNode,
  TableOfContentsNodeGroup,
  TableOfContentsProps,
} from './types';
import {
  findFirstNode,
  getHtmlIdFromItemId,
  isDivider,
  isExternalLink,
  isGroup,
  isGroupOpenByDefault,
  isNode,
  isNodeGroup,
} from './utils';

const ActiveItemContext = React.createContext<ActiveItemContextType>({
  activeId: undefined,
  lastActiveIndex: '',
  setLastActiveIndex: () => {},
});
const LinkContext = React.createContext<CustomLinkComponent | undefined>(undefined);
LinkContext.displayName = 'LinkContext';

export const TableOfContents = React.memo<TableOfContentsProps>(
  ({
    tree,
    activeId,
    Link,
    maxDepthOpenByDefault,
    externalScrollbar = false,
    isInResponsiveMode = false,
    onLinkClick,
  }) => {
    const [lastActiveIndex, setLastActiveIndex] = useState<string>('');
    const value = React.useMemo(
      () => ({
        lastActiveIndex,
        setLastActiveIndex,
        activeId,
      }),
      [lastActiveIndex, activeId],
    );

    const updateTocTree = React.useCallback((arr: TableOfContentsItem[], parentId: string): any[] => {
      return arr.map((item, key) => {
        let newItem: TableOfContentsItem = {
          ...item,
          index: parentId + key + '-',
        };

        // Process items array if it exists
        if (isGroup(item) || isNodeGroup(item)) {
          (newItem as TableOfContentsGroup | TableOfContentsNodeGroup).items = updateTocTree(
            item.items,
            parentId + key + '-',
          );
        }

        return newItem;
      });
    }, []);
    const updatedTree = updateTocTree(tree, '');

    const findFirstMatchAndIndexMatch = React.useCallback(
      (items: TableOfContentsGroupItem[], id: string | undefined): [TableOfContentsGroupItem | undefined, boolean] => {
        let firstMatch: TableOfContentsGroupItem | undefined;
        let hasAnyLastIndexMatch = false;
        if (!id) return [firstMatch, hasAnyLastIndexMatch];

        const walk = (arr: TableOfContentsGroupItem[], stack: TableOfContentsGroupItem[]): boolean => {
          for (const itm of arr) {
            const newStack = stack.concat(itm);

            const matches = ('slug' in itm && (itm as any).slug === id) || ('id' in itm && (itm as any).id === id);
            if (matches) {
              if (!firstMatch) firstMatch = itm;
              const hasLastIndexMatch = newStack.some(el => 'index' in el && (el as any).index === lastActiveIndex);
              if (hasLastIndexMatch) hasAnyLastIndexMatch = true;
            }

            if ('items' in itm && Array.isArray((itm as any).items)) {
              if (walk((itm as any).items, newStack)) return true;
            }
          }

          return false;
        };

        walk(items, []);
        return [firstMatch, hasAnyLastIndexMatch];
      },
      [lastActiveIndex],
    );

    const [firstMatchItem, hasAnyLastIndexMatch] = React.useMemo(
      () => findFirstMatchAndIndexMatch(updatedTree, activeId),
      [updatedTree, activeId, findFirstMatchAndIndexMatch],
    );

    React.useEffect(() => {
      if (!hasAnyLastIndexMatch && firstMatchItem && 'index' in firstMatchItem && firstMatchItem.index) {
        setLastActiveIndex(firstMatchItem.index);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [firstMatchItem, hasAnyLastIndexMatch]);

    const container = React.useRef<HTMLDivElement>(null);
    const child = React.useRef<HTMLDivElement>(null);
    const firstRender = useFirstRender();

    React.useEffect(() => {
      // setTimeout to handle scrollTo after groups expand to display active GroupItem
      setTimeout(() => {
        // First render should center, all others just scroll into view
        const scrollPosition = firstRender ? 'center' : 'nearest';
        const tocHasScrollbar =
          externalScrollbar ||
          (container.current && child.current && container.current.offsetHeight < child.current.offsetHeight);

        if (activeId && typeof window !== 'undefined' && tocHasScrollbar) {
          const elem = window.document.getElementById(getHtmlIdFromItemId(activeId));
          if (elem && 'scrollIntoView' in elem) {
            elem.scrollIntoView({ block: scrollPosition });
          }
        }
      }, 0);

      // Only run when activeId changes
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeId]);

    return (
      <Box ref={container} w="full" bg={isInResponsiveMode ? 'canvas' : 'canvas-100'} overflowY="auto">
        <Box ref={child} my={3}>
          <LinkContext.Provider value={Link}>
            <ActiveItemContext.Provider value={value}>
              <TOCContainer updatedTree={updatedTree}>
                {updatedTree.map((item, key: number) => {
                  if (isDivider(item)) {
                    return <Divider key={key} item={item} isInResponsiveMode={isInResponsiveMode} />;
                  }

                  return (
                    <GroupItem
                      key={key}
                      item={item}
                      depth={0}
                      maxDepthOpenByDefault={maxDepthOpenByDefault}
                      onLinkClick={onLinkClick}
                      isInResponsiveMode={isInResponsiveMode}
                    />
                  );
                })}
              </TOCContainer>
            </ActiveItemContext.Provider>
          </LinkContext.Provider>
        </Box>
      </Box>
    );
  },
);
TableOfContents.displayName = 'TableOfContents';

const Divider = React.memo<{
  item: TableOfContentsDivider;
  isInResponsiveMode?: boolean;
}>(({ item, isInResponsiveMode = false }) => {
  return (
    <Box
      pl={4}
      mb={2}
      mt={6}
      textTransform="uppercase"
      fontSize={isInResponsiveMode ? 'lg' : 'sm'}
      lineHeight="relaxed"
      letterSpacing="wide"
      fontWeight="bold"
    >
      {item.title}
    </Box>
  );
});
Divider.displayName = 'Divider';

const TOCContainer = React.memo<{
  updatedTree: TableOfContentsGroupItem[];
  children: React.ReactNode;
}>(({ children, updatedTree }) => {
  const { setLastActiveIndex } = React.useContext(ActiveItemContext);
  React.useEffect(() => {
    const firstNode = findFirstNode(updatedTree);
    if (firstNode) {
      setLastActiveIndex(firstNode.index);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Box>{children}</Box>;
});
TOCContainer.displayName = 'TOCContainer';
const GroupItem = React.memo<{
  depth: number;
  item: TableOfContentsGroupItem;
  isInResponsiveMode?: boolean;
  maxDepthOpenByDefault?: number;
  onLinkClick?(): void;
}>(({ item, depth, maxDepthOpenByDefault, isInResponsiveMode, onLinkClick }) => {
  if (isExternalLink(item)) {
    return (
      <Box as="a" href={item.url} target="_blank" rel="noopener noreferrer" display="block">
        <Item
          isInResponsiveMode={isInResponsiveMode}
          depth={depth}
          title={item.title}
          meta={<Box as={Icon} icon={['fas', 'external-link']} />}
        />
      </Box>
    );
  } else if (isGroup(item) || isNodeGroup(item)) {
    return (
      <Group
        depth={depth}
        item={item}
        maxDepthOpenByDefault={maxDepthOpenByDefault}
        onLinkClick={onLinkClick}
        isInResponsiveMode={isInResponsiveMode}
      />
    );
  } else if (isNode(item)) {
    return (
      <Node
        depth={depth}
        isInResponsiveMode={isInResponsiveMode}
        item={item}
        onLinkClick={onLinkClick}
        meta={
          item.meta ? (
            <Box
              color={NODE_META_COLOR[item.meta as HttpMethod] as ITextColorProps['color']}
              textTransform="uppercase"
              fontWeight="medium"
            >
              {item.meta}
            </Box>
          ) : (
            NODE_TYPE_META_ICON[item.type] && (
              <Flex alignItems="center">
                {item.version && <Version value={item.version} />}
                {item.type !== 'model' && (
                  <Box
                    as={Icon}
                    color={NODE_TYPE_ICON_COLOR[item.type as NodeType] as ITextColorProps['color']}
                    icon={NODE_TYPE_META_ICON[item.type]}
                  />
                )}
              </Flex>
            )
          )
        }
      />
    );
  }

  return null;
});
GroupItem.displayName = 'GroupItem';

const Group = React.memo<{
  depth: number;
  item: TableOfContentsGroup | TableOfContentsNodeGroup;
  maxDepthOpenByDefault?: number;
  isInResponsiveMode?: boolean;
  onLinkClick?(): void;
}>(({ depth, item, maxDepthOpenByDefault, isInResponsiveMode, onLinkClick = () => {} }) => {
  const { activeId, lastActiveIndex } = React.useContext(ActiveItemContext);
  const [isOpen, setIsOpen] = React.useState(() => isGroupOpenByDefault(depth, item, activeId, maxDepthOpenByDefault));
  const isActiveGroup = React.useCallback(
    (items: TableOfContentsGroupItem[], activeId: string | undefined, contextIndex: string): boolean => {
      return items.some(element => {
        const hasSlugOrId = 'slug' in element || 'id' in element;
        const hasItems = 'items' in element && Array.isArray((element as any).items);

        if (!hasSlugOrId && !hasItems) return false;

        if (
          activeId &&
          'index' in element &&
          ((element as any).slug === activeId || (element as any).id === activeId) &&
          (element as any).index === contextIndex
        ) {
          return true;
        }

        return hasItems ? isActiveGroup((element as any).items, activeId, contextIndex) : false;
      });
    },
    [],
  );

  const hasActive = isActiveGroup(item.items, activeId, lastActiveIndex);

  // If maxDepthOpenByDefault changes, we want to update all the isOpen states (used in live preview mode)
  React.useEffect(() => {
    const openByDefault = isGroupOpenByDefault(depth, item, activeId, maxDepthOpenByDefault);
    if (isOpen !== openByDefault) {
      setIsOpen(openByDefault);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [depth, maxDepthOpenByDefault]);

  // Expand group when it has the active item
  React.useEffect(() => {
    if (hasActive) {
      setIsOpen(true);
    }
  }, [hasActive]);

  const handleClick = (e: React.MouseEvent, forceOpen?: boolean) => {
    setIsOpen(forceOpen ? true : !isOpen);
  };

  const meta = (
    <Flex alignItems="center">
      {isNodeGroup(item) && item.version && <Version value={item.version} />}
      <Box
        as={Icon}
        icon={['fas', isOpen ? 'chevron-down' : 'chevron-right']}
        color="muted"
        fixedWidth
        onClick={(e: React.MouseEvent) => {
          // Don't propagate event when clicking icon
          e.stopPropagation();
          e.preventDefault();
          handleClick(e);
        }}
      />
    </Flex>
  );

  // Show the Group as active when group has active item and is closed
  const showAsActive = hasActive && !isOpen;
  let elem;
  if (isNodeGroup(item)) {
    elem = (
      <Node
        depth={depth}
        item={item}
        meta={meta}
        showAsActive={showAsActive}
        onClick={handleClick}
        onLinkClick={onLinkClick}
        isInResponsiveMode={isInResponsiveMode}
      />
    );
  } else {
    elem = (
      <Item
        isInResponsiveMode={isInResponsiveMode}
        title={item.title}
        meta={meta}
        onClick={handleClick}
        depth={depth}
        isActive={showAsActive}
        icon={
          item.itemsType &&
          NODE_GROUP_ICON[item.itemsType] && (
            <Box as={Icon} color={NODE_GROUP_ICON_COLOR[item.itemsType]} icon={NODE_GROUP_ICON[item.itemsType]} />
          )
        }
      />
    );
  }

  return (
    <>
      {elem}

      {isOpen &&
        item.items.map((groupItem, key) => {
          return (
            <GroupItem
              key={key}
              item={groupItem}
              depth={depth + 1}
              onLinkClick={onLinkClick}
              isInResponsiveMode={isInResponsiveMode}
            />
          );
        })}
    </>
  );
});
Group.displayName = 'Group';

const Item = React.memo<{
  depth: number;
  title: string;
  isActive?: boolean;
  id?: string;
  icon?: React.ReactElement<typeof Icon>;
  meta?: React.ReactNode;
  isInResponsiveMode?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}>(({ depth, isActive, id, title, meta, icon, isInResponsiveMode, onClick }) => {
  return (
    <Flex
      id={id}
      bg={{
        default: isInResponsiveMode ? 'canvas' : isActive ? 'primary-tint' : 'canvas-100',
        hover: isActive ? undefined : 'canvas-200',
      }}
      cursor="pointer"
      // @ts-expect-error
      pl={4 + depth * 4}
      pr={4}
      h={isInResponsiveMode ? 'lg' : 'md'}
      align="center"
      userSelect="none"
      onClick={onClick}
      title={title}
    >
      {icon}

      <Box
        alignItems="center"
        flex={1}
        mr={meta ? 1.5 : undefined}
        ml={icon && 1.5}
        textOverflow="truncate"
        fontSize={isInResponsiveMode ? 'lg' : 'base'}
      >
        {title}
      </Box>

      <Flex alignItems="center" fontSize={isInResponsiveMode ? 'base' : 'xs'}>
        {meta}
      </Flex>
    </Flex>
  );
});
Item.displayName = 'Item';

const Node = React.memo<{
  item: TableOfContentsNode | TableOfContentsNodeGroup;
  depth: number;
  meta?: React.ReactNode;
  showAsActive?: boolean;
  isInResponsiveMode?: boolean;
  onClick?: (e: React.MouseEvent, forceOpen?: boolean) => void;
  onLinkClick?(): void;
}>(({ item, depth, meta, showAsActive, isInResponsiveMode, onClick, onLinkClick = () => {} }) => {
  const { activeId, lastActiveIndex, setLastActiveIndex } = React.useContext(ActiveItemContext);
  const { index } = item;
  const isSlugMatched = activeId === item.slug || activeId === item.id;
  const isActive = lastActiveIndex === index && isSlugMatched;
  const LinkComponent = React.useContext(LinkContext);

  const handleClick = (e: React.MouseEvent) => {
    if (isActive) {
      // Don't trigger link click when we're active
      e.stopPropagation();
      e.preventDefault();
    } else {
      setLastActiveIndex(index);
      onLinkClick();
    }

    // Force open when clicking inactive group
    if (onClick) {
      onClick(e, isActive ? undefined : true);
    }
  };

  return (
    <Box
      as={LinkComponent}
      to={resolveRelativeLink(item.slug)}
      display="block"
      textDecoration="no-underline"
      className="ElementsTableOfContentsItem"
    >
      <Item
        id={getHtmlIdFromItemId(item.slug || item.id)}
        isActive={isActive || showAsActive}
        depth={depth}
        title={item.title}
        icon={
          NODE_TYPE_TITLE_ICON[item.type] && (
            <Box as={Icon} color={NODE_TYPE_ICON_COLOR[item.type]} icon={NODE_TYPE_TITLE_ICON[item.type]} />
          )
        }
        meta={meta}
        isInResponsiveMode={isInResponsiveMode}
        onClick={e => handleClick(e)}
      />
    </Box>
  );
});
Node.displayName = 'Node';

const Version: React.FC<{ value: string }> = ({ value }) => {
  return (
    <Box mr={2}>
      <VersionBadge value={value} backgroundColor="#909DAB" />
    </Box>
  );
};
