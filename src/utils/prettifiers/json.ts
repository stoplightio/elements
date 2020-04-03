import { Prettifier } from './types';

export const prettifyJSON: Prettifier<unknown> = json => {
  try {
    const finalJson = typeof json === 'string' ? JSON.parse(json) : json;

    return JSON.stringify(finalJson, null, 2);
  } catch {
    return String(json);
  }
};
