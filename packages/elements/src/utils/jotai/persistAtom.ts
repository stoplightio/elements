import { safeParse } from '@stoplight/json';
import { atom, WritableAtom } from 'jotai';

export const persistAtom = <T extends Object>(key: string, atomInstance: WritableAtom<T, T>) => {
  if (typeof window === 'undefined' || window.localStorage === undefined) {
    return atomInstance;
  }

  return atom<T, T>(
    get => {
      const localStorageValue = window.localStorage.getItem(key);
      const atomValue = get(atomInstance);

      if (localStorageValue === null) return atomValue;

      return safeParse(localStorageValue) ?? atomValue;
    },
    (_, set, update) => {
      try {
        /* setItem can throw when storage is full */
        window.localStorage.setItem(key, JSON.stringify(update));
      } catch (error) {
        console.error(error);
      }
      set(atomInstance, update);
    },
  );
};
