import { IMagicNode } from '../AST/basics';
import { TypedYArray } from './TypedYArray';
import { TypedYMap } from './TypedYMap';
import { TypedYText } from './TypedYText';
import { Yify } from './Yify';

export function Yjsify<T extends Omit<IMagicNode, 'id' | 'parent'>>(arg: T): Yify<T> {
  if (Array.isArray(arg)) {
    // @ts-ignore
    return new TypedYArray(arg.map(n => Yjsify(n)));
  } else if (typeof arg === 'object' && arg !== null) {
    const o: any = Object.fromEntries(
      Object.entries(arg)
        .filter(([key]) => key !== 'id' && key !== 'parent')
        // @ts-ignore
        .map(([key, value]) => [key, Yjsify(value)]),
    );
    if (o.type === ('description' as const)) {
      o.value = new TypedYText(o.value);
    }
    // @ts-ignore
    return new TypedYMap(o);
  } else {
    return arg;
  }
}

// @ts-ignore
window.Yjsify = Yjsify;
