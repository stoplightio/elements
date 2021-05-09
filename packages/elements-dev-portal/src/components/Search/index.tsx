import { NodeIconMapping } from '@stoplight/elements/types';
import { Box, Flex, Icon, Input, ListBox, ListBoxItem, Modal, ModalProps, TextColorVals } from '@stoplight/mosaic';
import * as React from 'react';

import { NodeSearchResult } from '../../interfaces/node';

export const Search = ({
  search,
  searchResults,
  isOpen,
  onClose,
  onClick,
  onSearch,
}: {
  search?: string;
  searchResults?: NodeSearchResult[];
  onSearch: (search: string) => void;
  onClick: (result: NodeSearchResult) => void;
  isOpen?: boolean;
  onClose: ModalProps['onClose'];
}) => {
  const listBoxRef = React.useRef<HTMLUListElement>();
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
          icon={<Icon icon={['fal', 'search']} size="lg" />}
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
        <Box
          as={ListBox}
          ref={listBoxRef}
          overflowY="auto"
          style={{ height: '300px' }}
          m={-5}
          aria-label="Search"
          items={searchResults}
          selectionMode="single"
          onSelectionChange={onSelectionChange}
        >
          {(searchResult: NodeSearchResult) => (
            <ListBoxItem key={`${searchResult.id}-${searchResult.project_id}`} textValue={searchResult.title}>
              <Box p={3} borderB>
                <Flex align="center">
                  <Box
                    as={Icon}
                    size="lg"
                    w={4}
                    icon={['fal', NodeIcons[searchResult.type]]}
                    color={NodeIconColor[searchResult.type]}
                  />

                  <Box
                    flex={1}
                    fontSize="lg"
                    dangerouslySetInnerHTML={{ __html: searchResult.highlighted.name }}
                    fontWeight="medium"
                    textOverflow="overflow-ellipsis"
                    mx={2}
                  />

                  <Box fontSize="sm" color="muted">
                    {searchResult.project_name}
                  </Box>
                </Flex>

                <Box
                  dangerouslySetInnerHTML={{ __html: searchResult.highlighted.summary }}
                  color="muted"
                  fontSize="sm"
                  mt={1}
                  ml={6}
                />
              </Box>
            </ListBoxItem>
          )}
        </Box>
      ) : (
        <Flex w="full" h="full" align="center" justify="center" style={{ height: '300px' }} m={-5}>
          No search results
        </Flex>
      )}
    </Modal>
  );
};

// TODO: Make these constants in Elements
const NodeIcons: NodeIconMapping = {
  http_operation: 'crosshairs',
  http_service: 'cloud',
  article: 'book-open',
  model: 'cube',
};

const NodeIconColor: Record<string, TextColorVals> = {
  http_operation: 'success',
  http_service: 'danger',
  article: 'primary',
  model: 'warning',
};
