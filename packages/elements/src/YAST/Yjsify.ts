import { IMagicNode } from '../AST/basics';
import { TypedYArray } from './TypedYArray';
import { TypedYMap } from './TypedYMap';
import { Yify } from './Yify';

export function Yjsify<T extends Omit<IMagicNode, 'id' | 'parent'>>(arg: T): Yify<T> {
  if (Array.isArray(arg)) {
    // @ts-ignore
    return new TypedYArray(arg.map(n => Yjsify(n)));
  } else if (typeof arg === 'object' && arg !== null) {
    // @ts-ignore
    return new TypedYMap(
      Object.fromEntries(
        Object.entries(arg)
          .filter(([key]) => key !== 'id' && key !== 'parent')
          // @ts-ignore
          .map(([key, value]) => [key, Yjsify(value)]),
      ),
    );
  } else {
    return arg;
  }
}

// @ts-ignore
window.Yjsify = Yjsify;
