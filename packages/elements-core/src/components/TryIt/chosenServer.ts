import type { IServer } from '@stoplight/types';
import { atom } from 'jotai';

// track null separately from undefined so that we can tell if the server has been set (undefined indicates it has not been "processed" yet)
export const chosenServerAtom = atom<IServer | null | undefined>(undefined);
