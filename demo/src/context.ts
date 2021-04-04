import { createContext } from 'React';

export const DEFAULT_API_URL =
  'https://raw.githubusercontent.com/stoplightio/Public-APIs/master/reference/zoom/zoom.yaml';

export type GlobalContext = {
  apiDescriptionUrl: string;
  setDescriptionUrl: (value: string) => void;
};

export const defaultGlobalContext: GlobalContext = {
  apiDescriptionUrl: DEFAULT_API_URL,
  setDescriptionUrl: () => {},
};

export const GlobalContext = createContext<GlobalContext>(defaultGlobalContext);
