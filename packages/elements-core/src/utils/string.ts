import { curry } from 'lodash';

export const caseInsensitivelyEquals = curry((a: string, b: string) => a.toUpperCase() === b.toUpperCase());
