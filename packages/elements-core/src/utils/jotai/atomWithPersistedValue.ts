import { atomWithStorage, createJSONStorage } from 'jotai/utils';

/**
 * `atomWithStorage` backed by `localStorage`, with two adjustments:
 * - the stored value is read when the atom is created, so the first render already sees it
 * - a failing write (e.g. storage is full) is logged instead of thrown
 */
export const atomWithPersistedValue = <T>(key: string, initialValue: T) => {
  const storage = createJSONStorage<T>();
  const setItem = storage.setItem;
  storage.setItem = (storageKey, value) => {
    try {
      setItem(storageKey, value);
    } catch (error) {
      console.error(error);
    }
  };

  return atomWithStorage<T>(key, initialValue, storage, { getOnInit: true });
};
