import { curry } from 'lodash';

export const caseInsensitivelyEquals = curry((a: string, b: string) => a.toUpperCase() === b.toUpperCase());

export function slugify(name: string) {
  return name
    .replace(/\/|{|}|\s/g, '-')
    .replace(/-{2,}/, '-')
    .replace(/^-/, '')
    .replace(/-$/, '');
}
