import { TypedYArray } from './TypedYArray';
import { TypedYMap } from './TypedYMap';

// Replace Objects with TypedYMaps and Arrays with YArrays
export type Yify<T> = T extends Array<infer P>
  ? TypedYArray<Yify<P>>
  : T extends object
  ? TypedYMap<{ [P in keyof Omit<T, 'id' | 'parent'>]: Yify<Omit<T, 'id' | 'parent'>[P]> }>
  : T;
