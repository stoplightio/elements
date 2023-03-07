import {faCode, faSearch, faSpinner, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {
    NodeTypeColors,
    NodeTypeIconDefs,
    withMosaicProvider,
    withPersistenceBoundary,
    withQueryClientProvider,
    withStyles,
} from '@stoplight/elements-core';
import { Box, Flex, Icon, Input, ListBox, ListBoxItem, Modal, ModalProps } from '@stoplight/mosaic';
import {flow} from 'lodash';
import * as React from 'react';

import {NodeSearchResult} from '../../types';
import {Dictionary, NodeType} from "@stoplight/types";
import {MarkdownViewer} from "@stoplight/markdown-viewer";

export type SearchProps = {
  isLoading?: boolean;
  search?: string;
  searchResults?: NodeSearchResult[];
  onSearch: (search: string) => void;
  onClick: (result: NodeSearchResult) => void;
  isOpen?: boolean;
  onClose: ModalProps['onClose'];
};

const customNodeTypeIconDefs: Dictionary<IconDefinition, NodeType> = {
  ...NodeTypeIconDefs,
  http_operation: faCode
}

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

  const onSelectionChange = React.useCallback(
    keys => {
      const selectedId = keys.values().next().value;
      const selectedResult = searchResults?.find(
        searchResult => `${searchResult.uri}` === selectedId,
      );
      if (selectedResult) {
        onClick(selectedResult);
        onClose();
      }
    },
    [searchResults, onClick],
  );

  return (
    <Modal
      renderHeader={() => (
        <Box p={4} borderB>
          <Input
            appearance="minimal"
            size="lg"
            icon={<Box as={Icon} ml={1} icon={isLoading ? faSpinner : faSearch} spin={isLoading} />}
            autoFocus
            placeholder="Search..."
            value={search}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
        </Box>
      )}
      isOpen={!!isOpen}
      onClose={onClose}
      size="lg"
    >
      {searchResults && searchResults.length > 0 ? (
        <ListBox
          ref={listBoxRef}
          aria-label="Search"
          overflowY="auto"
          h={80}
          m={-5}
          pl={2}
          pr={2}
          items={searchResults}
          selectionMode="single"
          onSelectionChange={onSelectionChange}
        >
          {(searchResult: NodeSearchResult) => {
            return (
              <ListBoxItem key={`${searchResult.uri}`} textValue={searchResult.name}>
                <Box p={3} borderB>
                  <Flex className="search-result-header" align="center">
                    <Box
                      as={Icon}
                      w={4}
                      icon={customNodeTypeIconDefs[searchResult.type]}
                      style={{ color: NodeTypeColors[searchResult.type] }}
                    />
                    <Box
                      flex={1}
                      fontSize="lg"
                      dangerouslySetInnerHTML={{ __html: searchResult.name ?? '' }}
                      fontWeight="medium"
                      textOverflow="overflow-ellipsis"
                      mx={2}
                    />
                  </Flex>
                  <Box className="sl-elements-article search-result-content">
                    <MarkdownViewer className="sl-elements-article-content" markdown={searchResult.description} />
                  </Box>
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

export const Search = flow(
  withStyles,
  withPersistenceBoundary,
  withMosaicProvider,
  withQueryClientProvider,
)(SearchImpl);
