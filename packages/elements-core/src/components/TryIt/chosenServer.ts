import { atom } from 'jotai';

import type { IServer } from '../../utils/http-spec/IServer';

// track null separately from undefined so that we can tell if the server has been set (undefined indicates it has not been "processed" yet)
export const chosenServerAtom = atom<IServer | null | undefined>(undefined);
