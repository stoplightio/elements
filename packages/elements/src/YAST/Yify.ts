import { TypedYArray } from './TypedYArray';
import { TypedYMap } from './TypedYMap';
import { TypedYText } from './TypedYText';

export type Helper<T> = SwapSpecials<Omit<T, 'id' | 'parent'>>;

// Replace Objects with TypedYMaps and Arrays with YArrays
export type Yify<T> = T extends Array<infer P>
  ? TypedYArray<Yify<P>>
  : T extends object
  ? TypedYMap<{ [P in keyof Helper<T>]: Yify<Helper<T>[P]> }>
  : T;

type SwapSpecials<T> = T extends { type: 'description' } ? { type: 'description'; value: TypedYText } : T;
