import type { NodeSearchResult } from '@stoplight/elements-dev-portal';
import { Search as ElementsSearch, useGetNodes } from '@stoplight/elements-dev-portal';
import * as React from 'react';

export type SearchType = {
  projectIds: string[];
  workspaceId: string;
};
export const Search = ({ projectIds, workspaceId }: SearchType) => {
  const [search, setSearch] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const { data } = useGetNodes({
    search,
    projectIds,
    workspaceId,
  });

  const handleClose = () => {
    setOpen(false);
    setSearch('');
  };

  const handleClick = (data: NodeSearchResult) => {
    console.log('clicked', data);
  };

  return (
    <>
      <input placeholder="Search..." style={{ color: 'white' }} onFocus={() => setOpen(true)} />
      <ElementsSearch
        search={search}
        onSearch={setSearch}
        onClick={handleClick}
        onClose={handleClose}
        isOpen={open}
        searchResults={data}
      />
    </>
  );
};
