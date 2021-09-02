import { Search as ElementsSearch, useGetNodes } from '@stoplight/elements-dev-portal';
import { useModalState } from '@stoplight/mosaic';
import * as React from 'react';

export const Search = ({ renderTrigger, projectIds, workspaceId }: any) => {
  const { isOpen, open, close } = useModalState();
  const [search, setSearch] = React.useState('');
  const { data } = useGetNodes({
    search,
    projectIds: projectIds,
    workspaceId: workspaceId,
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
