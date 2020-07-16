import { Stringifier } from './types';

export const stringifyHTML: Stringifier<string | HTMLDocument> = html => {
  if (typeof html === 'object' && html[Symbol.toStringTag] === 'HTMLDocument') {
    return html.documentElement.outerHTML;
  }

  return String(html);
};
