import * as React from 'react';

import { EditModeContext } from '../containers/EditingProvider';

export function useStyle(data: { id?: string }, prop?: string) {
  const { getStyle } = React.useContext(EditModeContext);
  const id = data.id;
  if (id) {
    return getStyle(prop ? `${id}-${prop}` : id);
  } else {
    return;
  }
}
