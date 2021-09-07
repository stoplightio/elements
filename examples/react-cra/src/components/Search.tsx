import { Search as ElementsSearch, useGetNodes } from '@stoplight/elements-dev-portal';
// import { Provider } from '@stoplight/mosaic';
import * as React from 'react';
// import { QueryClient, QueryClientProvider } from 'react-query';

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

  const handleClick = () => {
    console.log('clicked');
  };
  // const queryClient = new QueryClient({
  //   defaultOptions: {
  //     queries: {
  //       retry: false,
  //       staleTime: 15 * 1000,
  //     },
  //   },
  // });
  return (
    <>
      <input placeholder="search term..." style={{ color: 'white' }} onFocus={() => setOpen(true)} />
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
