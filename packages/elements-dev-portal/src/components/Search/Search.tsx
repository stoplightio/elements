import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import {
  NodeTypeColors,
  NodeTypeIconDefs,
  withMosaicProvider,
  withPersistenceBoundary,
  withQueryClientProvider,
  withStyles,
} from '@stoplight/elements-core';
import { Box, Flex, Icon, Input, ListBox, ListBoxItem, Modal, ModalProps } from '@stoplight/mosaic';
import { pipe } from 'lodash/fp';
import * as React from 'react';

import { NodeSearchResult } from '../../types';

export type SearchProps = {
  search?: string;
  searchResults?: NodeSearchResult[];
  onSearch: (search: string) => void;
  onClick: (result: NodeSearchResult) => void;
  isOpen?: boolean;
  onClose: ModalProps['onClose'];
};

const SearchImpl = ({ search, searchResults, isOpen, onClose, onClick, onSearch }: SearchProps) => {
  const listBoxRef = React.useRef<HTMLDivElement>(null);

  const onChange = React.useCallback(e => onSearch(e.currentTarget.value), [onSearch]);

  const onKeyDown = React.useCallback(e => {
    // Focus the search results on arrow down
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      listBoxRef.current?.focus();
    }
  }, []);

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
    <Modal
      renderHeader={() => (
        <Input
          appearance="minimal"
          borderB
          size="lg"
          icon={<Box as={Icon} ml={1} icon={faSearch} />}
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
      {searchResults && searchResults.length > 0 ? (
        <ListBox
          ref={listBoxRef}
          aria-label="Search"
          overflowY="auto"
          h={80}
          m={-5}
          items={searchResults}
          selectionMode="single"
          onSelectionChange={onSelectionChange}
        >
          {(searchResult: NodeSearchResult) => {
            return (
              <ListBoxItem key={`${searchResult.id}-${searchResult.project_id}`} textValue={searchResult.title}>
                <Box p={3} borderB>
                  <Flex align="center">
                    <Box
                      as={Icon}
                      w={4}
                      icon={NodeTypeIconDefs[searchResult.type]}
                      style={{ color: NodeTypeColors[searchResult.type] }}
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
    </Modal>
  );
};

export const Search = pipe(
  withStyles,
  withPersistenceBoundary,
  withMosaicProvider,
  withQueryClientProvider,
)(SearchImpl);
