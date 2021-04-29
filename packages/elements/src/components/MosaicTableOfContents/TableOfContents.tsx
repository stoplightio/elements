import { Box, Flex, Icon } from '@stoplight/mosaic';
import * as React from 'react';

import { NODE_META_COLOR, NODE_TYPE_ICON_COLOR, NODE_TYPE_META_ICON, NODE_TYPE_TITLE_ICON } from './constants';
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
  isDivider,
  isExternalLink,
  isGroup,
  isGroupOpenByDefault,
  isNode,
  isNodeGroup,
} from './utils';

const ActiveIdContext = React.createContext<string | undefined>(undefined);
const LinkContext = React.createContext<CustomLinkComponent | undefined>(undefined);

export const TableOfContents = React.memo<TableOfContentsProps>(({ tree, activeId, Link }) => {
  React.useEffect(() => {
    if (activeId && typeof window !== 'undefined') {
      const elem = window.document.getElementById(getHtmlIdFromItemId(activeId));
      if (elem && 'scrollIntoView' in elem) {
        elem.scrollIntoView({ block: 'center' });
      }
    }
    // Only want to run this effect on initial render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box w="full" bg="canvas-100">
      <Box my={3}>
        <LinkContext.Provider value={Link}>
          <ActiveIdContext.Provider value={activeId}>
            {tree.map((item, key) => {
              if (isDivider(item)) {
                return <Divider key={key} item={item} />;
              }

              return <GroupItem key={key} item={item} depth={0} />;
            })}
          </ActiveIdContext.Provider>
        </LinkContext.Provider>
      </Box>
    </Box>
  );
});

const Divider = React.memo<{
  item: TableOfContentsDivider;
}>(({ item }) => {
  return (
    <Box
      pl={4}
      mb={2}
      mt={6}
      textTransform="uppercase"
      color="muted"
      fontSize="sm"
      lineHeight="relaxed"
      letterSpacing="wide"
    >
      {item.title}
    </Box>
  );
});

const GroupItem = React.memo<{
  depth: number;
  item: TableOfContentsGroupItem;
}>(({ item, depth }) => {
  if (isExternalLink(item)) {
    return (
      <Box as="a" href={item.url} target="_blank" rel="noopener noreferrer" display="block">
        <Item depth={depth} title={item.title} meta={<Box as={Icon} icon={['fal', 'external-link']} />} />
      </Box>
    );
  } else if (isGroup(item) || isNodeGroup(item)) {
    return <Group depth={depth} item={item} />;
  } else if (isNode(item)) {
    return (
      <Node
        depth={depth}
        item={item}
        meta={
          item.meta ? (
            <Box color={NODE_META_COLOR[item.meta]} textTransform="uppercase" fontWeight="medium">
              {item.meta}
            </Box>
          ) : (
            NODE_TYPE_META_ICON[item.type] && (
              <Box as={Icon} color={NODE_TYPE_ICON_COLOR[item.type]} icon={NODE_TYPE_META_ICON[item.type]} />
            )
          )
        }
      />
    );
  }

  return null;
});

const Group = React.memo<{
  depth: number;
  item: TableOfContentsGroup | TableOfContentsNodeGroup;
}>(({ depth, item }) => {
  const activeId = React.useContext(ActiveIdContext);
  const [isOpen, setIsOpen] = React.useState(() => {
    // Only need to check during initial render
    return isGroupOpenByDefault(depth, item, activeId);
  });

  const onClick = (e: React.MouseEvent, forceOpen?: boolean) => {
    setIsOpen(forceOpen ? true : !isOpen);
  };

  const meta = (
    <Box
      as={Icon}
      icon={['fal', isOpen ? 'chevron-down' : 'chevron-right']}
      color="muted"
      fixedWidth
      onClick={(e: React.MouseEvent) => {
        // Don't propagate event when clicking icon
        e.stopPropagation();
        e.preventDefault();
        onClick(e);
      }}
    />
  );

  let elem;
  if (isNodeGroup(item)) {
    elem = <Node depth={depth} item={item} meta={meta} onClick={onClick} />;
  } else {
    elem = <Item title={item.title} meta={meta} onClick={onClick} depth={depth} />;
  }

  return (
    <>
      {elem}

      {isOpen &&
        item.items.map((groupItem, key) => {
          return <GroupItem key={key} item={groupItem} depth={depth + 1} />;
        })}
    </>
  );
});

const Item = React.memo<{
  depth: number;
  title: string;
  isActive?: boolean;
  id?: string;
  icon?: React.ReactElement<typeof Icon>;
  meta?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}>(({ depth, isActive, id, title, meta, icon, onClick }) => {
  return (
    <Flex
      id={id}
      bg={{ default: isActive ? 'primary-tint' : 'canvas-100', hover: isActive ? undefined : 'canvas-200' }}
      cursor="pointer"
      // @ts-expect-error
      pl={4 + depth * 4}
      pr={4}
      h="md"
      align="center"
      userSelect="none"
      onClick={onClick}
      title={title}
    >
      {icon}

      <Box alignItems="center" flex={1} mr={meta ? 1.5 : undefined} ml={icon && 1.5} textOverflow="truncate">
        {title}
      </Box>

      <Flex alignItems="center" fontSize="xs">
        {meta}
      </Flex>
    </Flex>
  );
});

const Node = React.memo<{
  item: TableOfContentsNode | TableOfContentsNodeGroup;
  depth: number;
  meta?: React.ReactNode;
  onClick?: (e: React.MouseEvent, forceOpen?: boolean) => void;
}>(({ item, depth, meta, onClick }) => {
  const activeId = React.useContext(ActiveIdContext);
  const isActive = activeId === item.id;
  const LinkComponent = React.useContext(LinkContext);

  const handleClick = (e: React.MouseEvent) => {
    if (isActive) {
      // Don't trigger link click when we're active
      e.stopPropagation();
      e.preventDefault();
    }

    // Force open when clicking inactive group
    if (onClick) {
      onClick(e, isActive ? undefined : true);
    }
  };

  return (
    <Box as={LinkComponent} to={item.slug} display="block" textDecoration="no-underline">
      <Item
        id={getHtmlIdFromItemId(item.id)}
        isActive={isActive}
        depth={depth}
        title={item.title}
        icon={
          NODE_TYPE_TITLE_ICON[item.type] && (
            <Box as={Icon} color={NODE_TYPE_ICON_COLOR[item.type]} icon={NODE_TYPE_TITLE_ICON[item.type]} />
          )
        }
        meta={meta}
        onClick={handleClick}
      />
    </Box>
  );
});
