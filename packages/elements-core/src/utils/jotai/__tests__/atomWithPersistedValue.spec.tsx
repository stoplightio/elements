import { act, render, renderHook, screen } from '@testing-library/react';
import { atom, useAtom } from 'jotai';
import * as React from 'react';

import { PersistenceContextProvider } from '../../../context/Persistence';
import { atomWithPersistedValue } from '../atomWithPersistedValue';

const KEY = 'persistAtom_test';

describe('atomWithPersistedValue', () => {
  beforeEach(() => window.localStorage.clear());

  it('falls back to the default value when nothing is stored', () => {
    const testAtom = atomWithPersistedValue(KEY, 'default');
    const { result } = renderHook(() => useAtom(testAtom), { wrapper: PersistenceContextProvider });

    expect(result.current[0]).toBe('default');
  });

  it('reads an existing value from localStorage', () => {
    window.localStorage.setItem(KEY, JSON.stringify('stored'));
    const testAtom = atomWithPersistedValue(KEY, 'default');
    const { result } = renderHook(() => useAtom(testAtom), { wrapper: PersistenceContextProvider });

    expect(result.current[0]).toBe('stored');
  });

  it('writes updates to localStorage and to the atom', () => {
    const testAtom = atomWithPersistedValue(KEY, 'default');
    const { result } = renderHook(() => useAtom(testAtom), { wrapper: PersistenceContextProvider });

    act(() => result.current[1]('next'));

    expect(window.localStorage.getItem(KEY)).toBe(JSON.stringify('next'));
    expect(result.current[0]).toBe('next');
  });

  it('does not throw when localStorage is full', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const setItem = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });
    const testAtom = atomWithPersistedValue(KEY, 'default');
    const { result } = renderHook(() => useAtom(testAtom), { wrapper: PersistenceContextProvider });

    expect(() => act(() => result.current[1]('next'))).not.toThrow();
    expect(consoleError).toHaveBeenCalled();

    setItem.mockRestore();
    consoleError.mockRestore();
  });
});

describe('PersistenceContextProvider', () => {
  const valueAtom = atom('initial');

  const Value = ({ id }: { id: string }) => {
    const [value, setValue] = useAtom(valueAtom);
    return (
      <button data-testid={id} onClick={() => setValue('changed')}>
        {value}
      </button>
    );
  };

  it('isolates atom state between providers', () => {
    render(
      <>
        <PersistenceContextProvider>
          <Value id="a" />
        </PersistenceContextProvider>
        <PersistenceContextProvider>
          <Value id="b" />
        </PersistenceContextProvider>
      </>,
    );

    act(() => screen.getByTestId('a').click());

    expect(screen.getByTestId('a')).toHaveTextContent('changed');
    expect(screen.getByTestId('b')).toHaveTextContent('initial');
  });

  it('shares atom state between components inside one provider', () => {
    render(
      <PersistenceContextProvider>
        <Value id="a" />
        <Value id="b" />
      </PersistenceContextProvider>,
    );

    act(() => screen.getByTestId('a').click());

    expect(screen.getByTestId('b')).toHaveTextContent('changed');
  });
});

describe('atomWithPersistedValue with invalid stored data', () => {
  it('falls back to the default value when the stored JSON is malformed', () => {
    window.localStorage.setItem(KEY, '{not json');
    const testAtom = atomWithPersistedValue(KEY, 'default');
    const { result } = renderHook(() => useAtom(testAtom), { wrapper: PersistenceContextProvider });

    expect(result.current[0]).toBe('default');
  });
});
