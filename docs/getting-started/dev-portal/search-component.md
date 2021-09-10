# search-component

Once youve [installed]() the elements-dev-portal package, you can use the Search component to offer an autocomplete search...

## JavaScript

If you'd like to use this for React (and React-based tools like Gatsby) then use the `Search` JavaScript component. Below is an example of one way to implement it with an input:

<!-- title: Search.tsx -->

```jsx
import type { NodeSearchResult } from '@stoplight/elements-dev-portal';
import { Search as ElementsSearch, useGetNodes } from '@stoplight/elements-dev-portal';
import * as React from 'react';

export type SearchProps = {
  projectIds: string[];
};

export const Search = ({ projectIds }: SearchType) => {
  const [search, setSearch] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const { data } = useGetNodes({
    search,
    projectIds,
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
```
Here's an example of what that would look like in a website's navigation bar. All you'll need to include is any collection of `projectIds` that the search should traverse.

<!-- title: Navigation.tsx -->
```jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

import { Search } from './Search';

export const Navigation = () => {
  return (
    <nav className="topnav">
      <NavLink to="/stoplight-project">Stoplight Project</NavLink>
      <NavLink to="/zoom-api">Zoom API</NavLink>
      <Search projectIds={['cHJqOjYwNjYx']} />
    </nav>
  );
};
```
 

