import * as React from 'react';

import { EditModeContext } from '../containers/EditingProvider';

export function useClick(data: { id?: string }, prop?: string) {
  const { onClick } = React.useContext(EditModeContext);
  const id = data.id;
  if (id) {
    return (e: React.MouseEvent<Element>) => {
      onClick(e, prop ? `${id}-${prop}` : id);
    };
  } else {
    return () => void 0;
  }
}
