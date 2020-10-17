import { TypedYArray } from './TypedYArray';
import { TypedYMap } from './TypedYMap';
import { TypedYText } from './TypedYText';

export type Helper<T> = SwapSpecials<T>;

// Replace Objects with TypedYMaps and Arrays with YArrays
export type Yify<T> = T extends Array<infer P>
  ? TypedYArray<Yify<P>>
  : T extends object
  ? TypedYMap<{ [P in keyof Helper<T>]: Yify<Helper<T>[P]> }>
  : T;

type SwapSpecials<T> = T extends { description: any } ? Omit<T, 'description'> & { description: TypedYText } : T;

export type WithIds<T> = T extends Array<infer P>
  ? Array<WithIds<P>>
  : T extends object
  ? { [P in keyof T]: WithIds<T[P]> } & { id?: string }
  : T;
