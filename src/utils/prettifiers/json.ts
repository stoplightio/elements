import { Prettifier } from './types';

export const prettifyJSON: Prettifier<unknown> = (json) => {
  try {
    if (typeof json === 'string') {
      json = JSON.parse(json);
    }

    return JSON.stringify(json, null, 2);
  } catch {
    return String(json);
  }
};
