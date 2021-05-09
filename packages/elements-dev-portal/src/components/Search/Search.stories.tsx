import { Input, useModalState } from '@stoplight/mosaic';
import { Story } from '@storybook/react';
import * as React from 'react';

import { useGetNodes } from '../../hooks/useGetNodes';
import { NodeSearchResult } from '../../interfaces/node';
import { Search } from './';

type SearchWrapperProps = { projectIds: string[]; workspaceId: string };
// Wrapper to show how to use the node content hook
const SearchWrapper = ({ projectIds, workspaceId }: SearchWrapperProps) => {
  const { isOpen, open, close } = useModalState();
  const [search, setSearch] = React.useState('');
  const { data } = useGetNodes({
    search,
    projectIds,
    workspaceId,
  });

  const handleClose = () => {
    close();
    setSearch('');
  };

  const handleClick = (searchResult: NodeSearchResult) => {
    console.log('Search clicked', searchResult);
    handleClose();
  };

  return (
    <>
      <Input placeholder="Search..." onClick={open} />
      <Search
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

export default {
  title: 'Public/TableOfContents',
  component: SearchWrapper,
  argTypes: {
    workspaceId: { table: { category: 'Input' } },
    projectIds: { table: { category: 'Input' } },
    platformUrl: { table: { category: 'Input' } },
  },
  args: {
    projectIds: ['cHJqOjY'],
    workspaceId: 'd2s6MQ',
    platformUrl: 'https://x-6195.stoplight-dev.com',
  },
};

export const Playground: Story<SearchWrapperProps> = args => <SearchWrapper {...args} />;

Playground.storyName = 'Studio Demo';
