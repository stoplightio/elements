import { faExternalLink, IconName } from '@fortawesome/free-solid-svg-icons';
import { Box, Flex, Icon, ITextColorProps } from '@stoplight/mosaic';
import { HttpMethod, NodeType } from '@stoplight/types';
import * as React from 'react';

import { useRouterType } from '../../context/RouterType';
import { useFirstRender } from '../../hooks/useFirstRender';
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
  CustomLinkComponent,
  TableOfContentsDivider,
  TableOfContentsGroup,
  TableOfContentsGroupItem,
  TableOfContentsNode,
  TableOfContentsNodeGroup,
  TableOfContentsProps,
} from './types';
import {
  getHtmlIdFromItemId,
  hasActiveItem,
  isDivider,
  isExternalLink,
  isGroup,
  isGroupOpenByDefault,
  isNode,
  isNodeGroup,
} from './utils';

export interface CustomCSS extends React.CSSProperties {
  '--menu-icon-bg-color': string;
}

const ActiveIdContext = React.createContext<string | undefined>(undefined);
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
    const container = React.useRef<HTMLDivElement>(null);
    const child = React.useRef<HTMLDivElement>(null);
    const firstRender = useFirstRender();

    // when using the hash router, slugs must be absolute - otherwise the router will keep appending to the existing hash route
    // this flag makes a slug like `abc/operations/getPet` be rendered as `#/abc/operations/getPet`
    const makeSlugAbsoluteRoute = useRouterType() == 'hash';

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
        <Box ref={child} my={3} className="menu-items">
          <LinkContext.Provider value={Link}>
            <ActiveIdContext.Provider value={activeId}>
              {tree.map((item, key) => {
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
                    makeSlugAbsoluteRoute={makeSlugAbsoluteRoute}
                  />
                );
              })}
            </ActiveIdContext.Provider>
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
    <>
      <div className="divider"></div>
      <Box
        pl={4}
        mb={2}
        mt={6}
        className="section-header"
        textTransform="uppercase"
        fontSize={isInResponsiveMode ? 'lg' : 'sm'}
        lineHeight="relaxed"
        letterSpacing="wide"
        fontWeight="bold"
      >
        {item.title}
      </Box>
    </>
  );
});
Divider.displayName = 'Divider';

const GroupItem = React.memo<{
  depth: number;
  item: TableOfContentsGroupItem;
  isInResponsiveMode?: boolean;
  makeSlugAbsoluteRoute?: boolean;
  maxDepthOpenByDefault?: number;
  onLinkClick?(): void;
}>(({ item, depth, maxDepthOpenByDefault, isInResponsiveMode, makeSlugAbsoluteRoute, onLinkClick }) => {
  if (isExternalLink(item)) {
    return (
      <Box as="a" href={item.url} target="_blank" rel="noopener noreferrer" display="block">
        <Item
          isInResponsiveMode={isInResponsiveMode}
          depth={depth}
          title={item.title}
          meta={<Box as={Icon} icon={faExternalLink} />}
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
        makeSlugAbsoluteRoute={makeSlugAbsoluteRoute}
      />
    );
  } else if (isNode(item)) {
    return (
      <Node
        depth={depth}
        isInResponsiveMode={isInResponsiveMode}
        makeSlugAbsoluteRoute={makeSlugAbsoluteRoute}
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
  makeSlugAbsoluteRoute?: boolean;
  onLinkClick?(): void;
}>(({ depth, item, maxDepthOpenByDefault, isInResponsiveMode, makeSlugAbsoluteRoute, onLinkClick = () => {} }) => {
  const activeId = React.useContext(ActiveIdContext);
  const [isOpen, setIsOpen] = React.useState(() => isGroupOpenByDefault(depth, item, activeId, maxDepthOpenByDefault));
  const hasActive = !!activeId && hasActiveItem(item.items, activeId);

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
        makeSlugAbsoluteRoute={makeSlugAbsoluteRoute}
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
        description={(item as TableOfContentsNodeGroup).description}
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
              makeSlugAbsoluteRoute={makeSlugAbsoluteRoute}
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
  description?: string;
}>(({ depth, isActive, id, title, meta, icon, isInResponsiveMode, onClick, description }) => {
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
      h={isInResponsiveMode ? (description ? 'xl' : 'lg') : 'md'}
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
        ml={icon && 2}
        textOverflow="truncate"
        fontSize={isInResponsiveMode ? 'lg' : 'base'}
      >
        {description ? (
          <Box className="menu-item-heading" textOverflow="truncate">
            {title}
          </Box>
        ) : (
          title
        )}
        {description && (
          <Box fontSize="sm" className="menu-item-subtext" textOverflow="truncate">
            {description}
          </Box>
        )}
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
  makeSlugAbsoluteRoute?: boolean;
  onClick?: (e: React.MouseEvent, forceOpen?: boolean) => void;
  onLinkClick?(): void;
}>(
  ({ item, depth, meta, showAsActive, isInResponsiveMode, makeSlugAbsoluteRoute, onClick, onLinkClick = () => {} }) => {
    const activeId = React.useContext(ActiveIdContext);
    const isActive = activeId === item.slug || activeId === item.id;
    const LinkComponent = React.useContext(LinkContext);

    const handleClick = (e: React.MouseEvent) => {
      if (isActive) {
        // Don't trigger link click when we're active
        e.stopPropagation();
        e.preventDefault();
      } else {
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
        to={makeSlugAbsoluteRoute && !item.slug.startsWith('/') ? `/${item.slug}` : item.slug}
        display="block"
        textDecoration="no-underline"
        className="ElementsTableOfContentsItem"
        fontWeight={item.presentation?.fontWeight ?? 'normal'}
      >
        <Item
          id={getHtmlIdFromItemId(item.slug || item.id)}
          isActive={isActive || showAsActive}
          depth={depth}
          title={item.title}
          icon={
            item.presentation?.icon ? (
              <Flex
                rounded="full"
                flexShrink={0}
                className="menu-logo"
                h="sm"
                w="sm"
                style={
                  {
                    color: item.presentation?.color ?? '',
                    '--menu-icon-bg-color': item.presentation?.color ?? '',
                  } as CustomCSS
                }
                fontSize="base"
                lineHeight="none"
                alignItems="center"
                justify="center"
              >
                <Box textAlign="center">
                  <Icon icon={['fas', item.presentation?.icon as IconName]} />
                </Box>
              </Flex>
            ) : (
              NODE_TYPE_TITLE_ICON[item.type] && (
                <Box as={Icon} color={NODE_TYPE_ICON_COLOR[item.type]} icon={NODE_TYPE_TITLE_ICON[item.type]} />
              )
            )
          }
          meta={meta}
          isInResponsiveMode={isInResponsiveMode}
          onClick={handleClick}
        />
      </Box>
    );
  },
);
Node.displayName = 'Node';

const Version: React.FC<{ value: string }> = ({ value }) => {
  return (
    <Box mr={2}>
      <VersionBadge value={value} backgroundColor="#909DAB" />
    </Box>
  );
};
