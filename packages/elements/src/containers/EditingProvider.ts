import React from 'react';

export interface IEditMode {
  onClick: (e: React.MouseEvent, id: string) => void;
  getClasses: (id: string) => any; // the 'classnames' package doesn't export its types well :-/
  getStyle: (id: string) => any; // the `React.StyleHTMLAttributes<Element>` doesn't support custom CSS variables
}

const defaultEditMode: IEditMode = {
  onClick: () => void 0,
  getClasses: () => ({}),
  getStyle: () => ({}),
};
export const EditModeContext = React.createContext(defaultEditMode);
EditModeContext.displayName = 'EditModeContext';
