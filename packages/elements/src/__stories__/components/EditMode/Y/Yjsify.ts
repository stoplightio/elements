import { TypedYArray } from './TypedYArray';
import { TypedYMap } from './TypedYMap';
import { TypedYText } from './TypedYText';
import { Yify } from './Yify';

export function Yjsify<T>(arg: T): Yify<T> {
  if (Array.isArray(arg)) {
    // @ts-ignore
    return new TypedYArray(arg.map(n => Yjsify(n)));
  } else if (typeof arg === 'object' && arg !== null) {
    const o: any = Object.fromEntries(
      Object.entries(arg)
        // @ts-ignore
        .map(([key, value]) => [key, Yjsify(value)]),
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
window.Yjsify = Yjsify;
