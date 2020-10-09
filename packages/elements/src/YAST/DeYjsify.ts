import { IMagicNode } from '../AST/basics';
import { getId } from './getId';
import { getParent } from './getParent';
import { Yify } from './Yify';

export function DeYjsify<T extends IMagicNode>(map: Yify<T>): T {
  if (typeof map !== 'object' || map === null) return map;
  // @ts-ignore
  return new Proxy(
    {},
    {
      get(target, prop, receiver) {
        if (prop === 'id') {
          return getId(map);
        } else if (prop === 'parent') {
          return getParent(map);
        } else if (prop === 'children') {
          if (map.has('children')) {
            // @ts-ignore
            return map.get('children').map(n => DeYjsify(n));
          } else {
            return [];
          }
        } else {
          // @ts-ignore
          return DeYjsify(map.get(prop));
        }
      },
    },
  );
}

// @ts-ignore
window.DeYjsify = DeYjsify;
