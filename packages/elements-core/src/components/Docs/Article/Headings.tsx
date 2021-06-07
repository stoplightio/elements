import { faStream } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MDAST } from '@stoplight/markdown';
import { Box, Button, Flex, Popover } from '@stoplight/mosaic';
import * as React from 'react';

import { useComponentSize } from '../../../hooks/useComponentSize';
import { useComputeMarkdownHeadings } from '../../../hooks/useComputeMarkdownHeadings';
import { useLocationHash } from '../../../hooks/useLocationHash';
import { IArticleHeading, IArticleHeadings } from '../../../types';

export const ArticleHeadings = ({ tree, container }: { tree: MDAST.Root; container: HTMLDivElement | null }) => {
  const { width } = useComponentSize(container);
  const showHeadings = width >= 768;

  const headings = useComputeMarkdownHeadings(tree);

  return <Headings className="ArticleHeadings" headings={headings} minimal={!showHeadings} />;
};

const Headings: React.FC<IArticleHeadings> = ({ headings, className, title = 'On This Page', minimal }) => {
  const locationHash = useLocationHash();

  if (!headings || !headings.length) return null;

  const component = (
    <div style={{ maxHeight: '85vh', overflow: 'auto' }}>
      {title && (
        <Flex py={2} alignItems="center" fontSize="sm" fontWeight="medium" color="muted" style={{ paddingLeft: 18 }}>
          <FontAwesomeIcon icon={faStream} className="sl-mr-2" />
          {title}
        </Flex>
      )}

      {headings.map((heading, i) => (
        <Heading key={i} item={heading} isSelected={locationHash === `#${heading.id}`} />
      ))}
    </div>
  );

  if (minimal) {
    return (
      <Box pos="absolute" top={0} right={0} style={{ top: 10 }}>
        <Popover renderTrigger={<Button size="sm" borderColor="light" icon={faStream} />} placement="bottom">
          <Box className={className}>{component}</Box>
        </Popover>
      </Box>
    );
  }

  return (
    <Box
      pos="sticky"
      pr={4}
      pl={16}
      h="full"
      overflowX="auto"
      overflowY="auto"
      className={className}
      style={{ top: 30 }}
    >
      <Box borderL borderColor="light">
        {component}
      </Box>
    </Box>
  );
};

const Heading: React.FC<{ item: IArticleHeading; isSelected: boolean }> = ({ item, isSelected }) => {
  return (
    <Box
      as="a"
      href={`#${item.id}`}
      textOverflow="truncate"
      display="block"
      py={2}
      pr={8}
      fontWeight="medium"
      fontSize="sm"
      color={isSelected ? 'primary' : 'muted'}
      style={{ paddingLeft: `${3 + item.depth * 15}px` }}
    >
      {item.title}
    </Box>
  );
};
