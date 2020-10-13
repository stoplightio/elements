import React from 'react';

export interface IEditMode {
  onClick: (e: React.MouseEvent, id: [string, string]) => void;
  getClasses: (id: [string, string]) => any; // the 'classnames' package doesn't export its types well :-/
  getStyle: (id: [string, string]) => React.StyleHTMLAttributes<Element>;
}

const defaultEditMode: IEditMode = {
  onClick: () => void 0,
  getClasses: () => ({}),
  getStyle: () => ({}),
};
export const EditModeContext = React.createContext(defaultEditMode);
EditModeContext.displayName = 'EditModeContext';
