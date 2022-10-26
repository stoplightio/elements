import type { NodeSearchResult } from '../types';
import { Search as ElementsSearch } from './Search';
import * as React from 'react';
import { searchDocument } from "../utils/flex-search";
import { Box, Icon, Input } from "@stoplight/mosaic";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export type SearchProps = {
  apiDocName: string;
};

export const SearchBox = ({ apiDocName }: SearchProps) => {
  const [search, setSearch] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const data: NodeSearchResult[] = React.useMemo(() => {
    return searchDocument(apiDocName, search)
  }, [search]);

  const handleClose = () => {
    setOpen(false);
    setSearch('');
  };

  const getOriginPath = (fullHref: string): string => {
    const hashIndex = fullHref.indexOf("#");
    if (hashIndex === -1)
      return fullHref;
    return fullHref.substring(0, hashIndex);
  }

  const handleClick = (data: NodeSearchResult) => {
    window.location.href =
        `${getOriginPath(window.location.href)}#/${data.uri.startsWith("/") ? data.uri.substring(1) : data.uri}`;
  };
  console.log(open);

  return (
    <>
      <Input
          appearance="minimal"
          border
          icon={<Box as={Icon} ml={1} icon={faSearch}/>}
          placeholder="Search..."
          onFocus={() => setOpen(true)}
      />
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
