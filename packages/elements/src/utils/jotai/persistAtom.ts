import { atom, WritableAtom } from 'jotai';

export const persistAtom = (key: string, atomInstance: WritableAtom<string, string>) => {
  if (!window.localStorage) {
    return atomInstance;
  }

  return atom<string, string>(
    get => {
      const localStorageValue = window.localStorage.getItem(key);
      const atomValue = get(atomInstance);

      return localStorageValue !== null ? localStorageValue : atomValue;
    },
    (_, set, update) => {
      window.localStorage.setItem(key, update);
      set(atomInstance, update);
    },
  );
};
