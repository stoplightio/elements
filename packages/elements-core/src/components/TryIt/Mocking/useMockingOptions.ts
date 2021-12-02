import { atom, useAtom } from 'jotai';

import { MockingOptions } from './mocking-utils';

const persistedMockingOptionsAtom = atom<MockingOptions>({});
export const useMockingOptions = () => useAtom(persistedMockingOptionsAtom);
