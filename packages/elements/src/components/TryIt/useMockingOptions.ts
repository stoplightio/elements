import { atom, useAtom } from 'jotai';

import { MockingOptions } from './mocking-utils';

const persistedMockingOptionsAtom = atom<MockingOptions>({ isEnabled: false });
export const useMockingOptions = () => useAtom(persistedMockingOptionsAtom);
