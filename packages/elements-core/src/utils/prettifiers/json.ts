import { Prettifier } from './types';

export const prettifyJSON: Prettifier<unknown> = json => {
  try {
    let parsedJson = json;
    if (typeof json === 'string') {
      parsedJson = JSON.parse(json);
    }

    return JSON.stringify(parsedJson, null, 2);
  } catch {
    return String(json);
  }
};
