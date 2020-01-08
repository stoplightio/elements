import * as React from 'react';
import { IProjectNode } from '../../types';
import { Drawer } from './Drawer';
import { NodeList } from './List';
import { SearchBar } from './SearchBar';

interface ISearchComponent {
  query: string;
  onChange: (query: string) => void; // TODO: Is this correct?
  nodes: IProjectNode[];
  isOpen: boolean;
  onClose?: () => void;
  onReset?: () => void;
  loadMore: any; // TODO: Type this
  isLoading: any; // TODO: Type this
  error?: any; // TODO: Type this
}

export const Search: React.FunctionComponent<ISearchComponent> = ({
  query,
  onChange,
  nodes,
  isOpen,
  onClose,
  onReset,
  loadMore,
  isLoading,
  error,
}) => {
  return (
    <Drawer className="Search__drawer" backdropClassName="Search__backdrop" isOpen={isOpen} onClose={onClose}>
      <>
        <SearchBar query={query} onChange={onChange} />

        <NodeList loading={isLoading} error={error} data={nodes} loadMore={loadMore} />
      </>
    </Drawer>
  );
};

// if (error) {
//   console.error(error);

//   return (
//     <NonIdealState
//       title="An error has occured!"
//       description="Try refreshing the page. If the error persists, please reach out to us at support@stoplight.io."
//       icon="error"
//       action={
//         <Button
//           text="Reload the Page"
//           onClick={() => {
//             window.location.reload();
//           }}
//         />
//       }
//     />
//   );
// }

// if (!data || !data.length) {
//   if (!data && loading) {
//     return <Spinner className="mt-32" />;
//   } else {
//     return (
//       <NonIdealState
//         title="No Results"
//         description="Try tweaking your filters or search term."
//         icon="zoom-out"
//         action={
//           explorerStore.isFiltered ? (
//             <Button
//               text="Clear Search & Filters"
//               onClick={() => {
//                 explorerStore.clearFilters(true);
//               }}
//             />
//           ) : (
//             undefined
//           )
//         }
//       />
//     );
//   }
// }
