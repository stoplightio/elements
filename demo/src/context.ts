import { createContext } from 'react';

import { DEFAULT_API_URL } from './constants';

export type GlobalContext = {
  apiDescriptionUrl: string;
  setDescriptionUrl: (value: string) => void;
  layout?: 'stacked' | 'sidebar';
};

export const defaultGlobalContext: GlobalContext = {
  apiDescriptionUrl: DEFAULT_API_URL,
  setDescriptionUrl: () => {},
};

export const GlobalContext = createContext<GlobalContext>(defaultGlobalContext);
