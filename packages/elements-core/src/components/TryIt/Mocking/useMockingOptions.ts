import { atom, useAtom } from 'jotai';

import { MockingOptions } from './mocking-utils';

const mockingOptionsAtom = atom<MockingOptions>({});
export const useMockingOptions = () => useAtom(mockingOptionsAtom);
