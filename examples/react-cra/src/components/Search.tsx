import type { NodeSearchResult } from '@stoplight/elements-dev-portal';
import { Search as ElementsSearch, useGetNodes, useGetWorkspace } from '@stoplight/elements-dev-portal';
import * as React from 'react';

export type SearchProps = {
  projectIds: string[];
};

export const Search = ({ projectIds }: SearchProps) => {
  const [search, setSearch] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const { data } = useGetNodes({
    search,
    projectIds,
  });
  const { data: workspace } = useGetWorkspace({
    projectIds,
  });

  const handleClose = () => {
    setOpen(false);
    setSearch('');
  };

  const handleClick = (data: NodeSearchResult) => {
    window.location.href = `https://${workspace?.workspace.slug}.stoplight.io/docs/${data.project_slug}${data.uri}`;
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
