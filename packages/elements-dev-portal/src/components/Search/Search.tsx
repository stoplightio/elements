import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import {
  NodeTypeColors,
  NodeTypeIconDefs,
  withMosaicProvider,
  withPersistenceBoundary,
  withQueryClientProvider,
  withStyles,
} from '@stoplight/elements-core';
import { Box, Flex, Icon, Input, ListBox, ListBoxItem, Modal, ModalProps } from '@stoplight/mosaic';
import { flow } from 'lodash';
import * as React from 'react';

import { NodeSearchResult } from '../../types';

export type SearchProps = {
  isLoading?: boolean;
  search?: string;
  searchResults?: NodeSearchResult[];
  onSearch: (search: string) => void;
  onClick: (result: NodeSearchResult) => void;
  isOpen?: boolean;
  onClose: ModalProps['onClose'];
};

export type SearchResultsListProps = {
  searchResults?: NodeSearchResult[];
  isEmbedded?: boolean;
  showDivider?: boolean;
  onClick: (result: NodeSearchResult) => void;
};

const SearchImpl = ({ isLoading, search, searchResults, isOpen, onClose, onClick, onSearch }: SearchProps) => {
  const listBoxRef = React.useRef<HTMLDivElement>(null);

  const onChange = React.useCallback(e => onSearch(e.currentTarget.value), [onSearch]);

  const onKeyDown = React.useCallback(e => {
    // Focus the search results on arrow down
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      listBoxRef.current?.focus();
    }
  }, []);

  return (
    <Modal
      renderHeader={() => (
        <Input
          appearance="minimal"
          borderB
          size="lg"
          icon={<Box as={Icon} ml={1} icon={isLoading ? faSpinner : faSearch} spin={isLoading} />}
          autoFocus
          placeholder="Search..."
          value={search}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      )}
      isOpen={!!isOpen}
      onClose={onClose}
    >
      <SearchResultsList searchResults={searchResults} onClick={onClick} />
    </Modal>
  );
};

export const SearchResultsList = ({
  searchResults,
  onClick,
  isEmbedded,
  showDivider = true,
}: SearchResultsListProps) => {
  const listBoxRef = React.useRef<HTMLDivElement>(null);
  const onSelectionChange = React.useCallback(
    keys => {
      const selectedId = keys.values().next().value;
      const selectedResult = searchResults?.find(
        searchResult => `${searchResult.id}-${searchResult.project_id}` === selectedId,
      );
      if (selectedResult) {
        onClick(selectedResult);
      }
    },
    [searchResults, onClick],
  );

  return (
    <>
      {searchResults && searchResults.length > 0 ? (
        <ListBox
          ref={listBoxRef}
          aria-label="Search"
          overflowY="auto"
          h={isEmbedded ? undefined : 80}
          m={-5}
          items={searchResults}
          selectionMode="single"
          onSelectionChange={onSelectionChange}
        >
          {(searchResult: NodeSearchResult) => {
            return (
              <ListBoxItem key={`${searchResult.id}-${searchResult.project_id}`} textValue={searchResult.title}>
                <Box p={3} borderB={!showDivider ? undefined : true}>
                  <Flex align="center">
                    <Box
                      as={Icon}
                      w={4}
                      icon={NodeTypeIconDefs[searchResult.type as keyof typeof NodeTypeIconDefs]}
                      style={{ color: NodeTypeColors[searchResult.type as keyof typeof NodeTypeIconDefs] }}
                    />

                    <Box
                      flex={1}
                      fontSize="lg"
                      dangerouslySetInnerHTML={{ __html: searchResult.highlighted.name ?? '' }}
                      fontWeight="medium"
                      textOverflow="overflow-ellipsis"
                      mx={2}
                    />

                    <Box fontSize="sm" color="muted">
                      {searchResult.project_name}
                    </Box>
                  </Flex>

                  <Box
                    dangerouslySetInnerHTML={{ __html: searchResult.highlighted.summary ?? '' }}
                    color="muted"
                    fontSize="sm"
                    mt={1}
                    ml={6}
                  />
                </Box>
              </ListBoxItem>
            );
          }}
        </ListBox>
      ) : (
        <Flex w="full" h={80} align="center" justify="center" m={-5}>
          No search results
        </Flex>
      )}
    </>
  );
};

export const SearchResults = flow(
  withStyles,
  withPersistenceBoundary,
  withMosaicProvider,
  withQueryClientProvider,
)(SearchResultsList);

export const Search = flow(
  withStyles,
  withPersistenceBoundary,
  withMosaicProvider,
  withQueryClientProvider,
)(SearchImpl);
