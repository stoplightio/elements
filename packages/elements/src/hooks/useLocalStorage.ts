import { useEffect, useState } from 'react';

type ValueSetter<T> = (value: T | ((val: T) => T)) => void;

export function useLocalStorage<T>(key: string, initialValue: T): [T, ValueSetter<T>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);

      return initialValue;
    }
  });

  const storageListener = (event: StorageEvent) => {
    if (event.key === key && event.newValue !== null) {
      setStoredValue(JSON.parse(event.newValue));
    }
  };

  useEffect(() => {
    window.addEventListener('storage', storageListener);

    return () => window.removeEventListener('storage', storageListener);
  });

  const setValue: ValueSetter<T> = value => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);

      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
