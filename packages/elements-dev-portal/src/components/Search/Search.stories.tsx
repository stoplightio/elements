import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Box, Icon, Input, useModalState } from '@stoplight/mosaic';
import { Story } from '@storybook/react';
import * as React from 'react';

import { useGetNodes } from '../../hooks/useGetNodes';
import { useGetWorkspace } from '../../hooks/useGetWorkspace';
import { NodeSearchResult } from '../../types';
import { Search, SearchResults } from './';

type SearchWrapperProps = { projectIds: string[]; workspaceId: string };
// Wrapper to show how to use the node content hook
const SearchWrapper = ({ projectIds, workspaceId }: SearchWrapperProps) => {
  const { isOpen, open, close } = useModalState();
  const [search, setSearch] = React.useState('');
  const { data, isFetching } = useGetNodes({
    search,
    projectIds,
    workspaceId,
  });

  const { data: workspace } = useGetWorkspace({
    projectIds,
  });

  const handleClose = () => {
    close();
    setSearch('');
  };

  const handleClick = (searchResult: NodeSearchResult) => {
    console.log('Search clicked', searchResult);
    window.open(
      `https://${workspace?.workspace.slug}.stoplight.io/docs/${searchResult.project_slug}${searchResult.uri}`,
      '_blank',
    );

    handleClose();
  };

  return (
    <>
      <Input placeholder="Search..." onClick={open} />
      <Search
        isLoading={isFetching}
        search={search}
        searchResults={data}
        onSearch={setSearch}
        isOpen={isOpen}
        onClose={handleClose}
        onClick={handleClick}
      />
    </>
  );
};

const EmbeddedSearchWrapper = ({ projectIds, workspaceId }: SearchWrapperProps) => {
  const [search, setSearch] = React.useState('');
  const { data, isFetching } = useGetNodes({
    search,
    projectIds,
    workspaceId,
  });

  const { data: workspace } = useGetWorkspace({
    projectIds,
  });

  const handleClick = (searchResult: NodeSearchResult) => {
    console.log('Search clicked', searchResult);
    window.open(
      `https://${workspace?.workspace.slug}.stoplight.io/docs/${searchResult.project_slug}${searchResult.uri}`,
      '_blank',
    );
  };

  return (
    <>
      <Input
        appearance="minimal"
        borderB
        icon={<Box as={Icon} ml={1} icon={isFetching ? faSpinner : faSearch} spin={isFetching} />}
        autoFocus
        placeholder="Search..."
        value={search}
        onChange={e => {
          setSearch(e.currentTarget.value);
        }}
        type="search"
      />
      <Box p={5}>
        <SearchResults searchResults={data} onClick={handleClick} isEmbedded={true} />
      </Box>
    </>
  );
};
export default {
  title: 'Public/Search',
  component: SearchWrapper,
  argTypes: {
    workspaceId: { table: { category: 'Input' } },
    projectIds: { table: { category: 'Input' } },
    platformUrl: { table: { category: 'Input' } },
  },
  args: {
    projectIds: ['cHJqOjYwNjYx'],
    workspaceId: 'd2s6NDE1NTU',
    platformUrl: 'https://stoplight.io',
  },
};

export const Playground: Story<SearchWrapperProps> = args => <SearchWrapper {...args} />;
export const EmbeddedSearch: Story<SearchWrapperProps> = args => <EmbeddedSearchWrapper {...args} />;

Playground.storyName = 'Studio Demo';

EmbeddedSearch.storyName = 'Embedded Search';
