import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Box, Button, Flex, Icon, Input, Modal } from '@stoplight/mosaic';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { NodeSearchResult, ProjectTableOfContents } from '../../types';
import { TableOfContents } from '../TableOfContents';
import { SearchResults } from './Search';

type SearchOverlayProps = {
  isFetching: boolean;
  search: string;
  setSearch: (search: string) => void;
  data?: NodeSearchResult[];
  toc?: ProjectTableOfContents;
  nodeSlug?: string;
  projectSlug?: string;
  branchSlug?: string;
  isSearchShowing: boolean;
  onClose: () => void;
  onClick: (item?: NodeSearchResult) => void;
};

export const SearchOverlay = ({
  isFetching,
  search,
  setSearch,
  data,
  toc,
  nodeSlug,
  projectSlug,
  branchSlug,
  isSearchShowing,
  onClose,
  onClick,
}: SearchOverlayProps) => {
  return (
    <Modal isOpen={isSearchShowing} onClose={onClose}>
      <Box className="sl-overlay" bg="canvas" overflowY="scroll" data-test="search-overlay">
        <Flex alignItems="center" h="3xl" px={7} bg="canvas" borderB pos="sticky" zIndex={20}>
          <Flex w="full">
            <Box pt={1} pr={2}>
              <Button
                appearance="minimal"
                onClick={() => {
                  onClose();
                }}
                data-test="search-overlay-back-button"
              >
                <Icon icon={['fas', 'arrow-left']} color="gray" size="lg" />
              </Button>
            </Box>
            <Input
              border
              data-test="docs-search-input"
              display="inline-block"
              appearance="minimal"
              icon={<Box as={Icon} ml={1} icon={isFetching ? faSpinner : faSearch} spin={isFetching} />}
              autoFocus
              placeholder={projectSlug ? 'Search within the project' : 'Search...'}
              value={search}
              onChange={e => {
                setSearch(e.currentTarget.value);
              }}
              type="search"
              w="full"
              size="lg"
            />
          </Flex>
        </Flex>
        <Box px={5} py={toc && !search ? 0 : 5} data-test="responsive-project-toc">
          {toc && !search && projectSlug && (
            <TableOfContents
              tableOfContents={{ ...toc, hide_powered_by: true }}
              activeId={nodeSlug || ''}
              Link={Link}
              onLinkClick={onClick}
            />
          )}
          {search && (
            <SearchResults searchResults={data} onClick={item => onClick(item)} isEmbedded={true} showDivider={false} />
          )}
        </Box>
      </Box>
    </Modal>
  );
};
