import { atomWithStorage } from 'jotai/utils';

// track null separately from undefined so that we can tell if the server has been set (undefined indicates it has not been "processed" yet)
export const chosenServerVariablesAtom = atomWithStorage<{ [key: string]: string }>('TryIt_chosenServerVariables', {});
