import { TypedYArray } from './TypedYArray';
import { TypedYMap } from './TypedYMap';
import { TypedYText } from './TypedYText';

export type Helper<T> = SwapSpecials<T>;

// Replace Objects with TypedYMaps and Arrays with YArrays
export type YifyClassic<T> = T extends Array<infer P>
  ? TypedYArray<YifyClassic<P>>
  : T extends object
  ? TypedYMap<{ [P in keyof Helper<T>]: YifyClassic<Helper<T>[P]> }>
  : T;

type SwapSpecials<T> = T extends { description: any } ? Omit<T, 'description'> & { description: TypedYText } : T;

export type WithIds<T> = T extends Array<infer P>
  ? Array<WithIds<P>>
  : T extends object
  ? { [P in keyof T]: WithIds<T[P]> } & { id?: string }
  : T;

export function YjsifyClassic<T>(arg: T): YifyClassic<T> {
  if (Array.isArray(arg)) {
    // @ts-ignore
    return new TypedYArray(arg.map(n => YjsifyClassic(n)));
  } else if (typeof arg === 'object' && arg !== null) {
    const o: any = Object.fromEntries(
      Object.entries(arg)
        // @ts-ignore
        .map(([key, value]) => [key, YjsifyClassic(value)]),
    );
    if (typeof o.description === 'string') {
      o.description = new TypedYText(o.description);
    }
    // @ts-ignore
    return new TypedYMap(o);
  } else {
    // @ts-ignore
    return arg;
  }
}

// @ts-ignore
window.YjsifyClassic = YjsifyClassic;
