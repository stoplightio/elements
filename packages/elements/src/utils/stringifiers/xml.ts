import { Stringifier } from './types';

export const stringifyXML: Stringifier<string | XMLDocument> = xml => {
  if (typeof xml === 'object' && xml[Symbol.toStringTag] === 'XMLDocument') {
    return new XMLSerializer().serializeToString(xml.documentElement);
  }

  return String(xml);
};
