import { Search as ElementsSearch, useGetNodes } from '@stoplight/elements-dev-portal';
import { useModalState } from '@stoplight/mosaic';
import * as React from 'react';

export const Search = ({ renderTrigger }: any) => {
  const { isOpen, open, close } = useModalState();
  const [search, setSearch] = React.useState('');
  const { data } = useGetNodes({
    search,
    projectIds: ['cHJqOjYwNjYx'],
    workspaceId: 'd2s6NDE1NTU',
  });

  const handleClose = () => {
    close();
    setSearch('');
  };

  const handleClick = () => {
    console.log('clicked');
  };

  return (
    <>
      {renderTrigger({ open })}
      <ElementsSearch
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
