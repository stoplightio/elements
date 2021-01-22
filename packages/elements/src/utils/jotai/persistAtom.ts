import { atom, WritableAtom } from 'jotai';

export const persistAtom = (key: string, atomInstance: WritableAtom<string, string>) => {
  if (typeof window === 'undefined' || window.localStorage === undefined) {
    return atomInstance;
  }

  return atom<string, string>(
    get => {
      const localStorageValue = window.localStorage.getItem(key);
      const atomValue = get(atomInstance);

      return localStorageValue !== null ? localStorageValue : atomValue;
    },
    (_, set, update) => {
      try {
        /* setItem can throw when storage is full */
        window.localStorage.setItem(key, update);
      } catch (error) {
        console.error(error);
      }
      set(atomInstance, update);
    },
  );
};
