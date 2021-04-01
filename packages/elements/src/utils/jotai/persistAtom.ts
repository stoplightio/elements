import { safeParse } from '@stoplight/json';
import { atom, WritableAtom } from 'jotai';

export const persistAtom = <O extends Object>(key: string, atomInstance: WritableAtom<O, O>) => {
  if (typeof window === 'undefined' || window.localStorage === undefined) {
    return atomInstance;
  }

  return atom<O, O>(
    get => {
      const localStorageValue = window.localStorage.getItem(key);
      const atomValue = get(atomInstance);

      return localStorageValue !== null ? safeParse(localStorageValue) ?? localStorageValue : atomValue;
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
