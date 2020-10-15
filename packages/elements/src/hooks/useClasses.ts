import * as React from 'react';

import { EditModeContext } from '../containers/EditingProvider';

export function useClasses(data: { id?: string }, prop?: string) {
  const { getClasses } = React.useContext(EditModeContext);
  const id = data.id;
  if (id) {
    return getClasses(prop ? `${id}-${prop}` : id);
  } else {
    return;
  }
}
