import { curry } from 'lodash';

export const caseInsesitivelyEquals = curry((a: string, b: string) => a.toUpperCase() === b.toUpperCase());
