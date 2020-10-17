import * as Y from 'yjs';

import { Yify } from './Yify';

export function DeYjsify<T>(map: Yify<T>): T {
  // @ts-ignore
  if (typeof map !== 'object' || map === null) return map;
  // @ts-ignore
  if (map instanceof Y.Text) return map.toString();
  // @ts-ignore
  if (map instanceof Y.Array) return map.map(x => DeYjsify(x));

  if (map instanceof Y.Map) {
    // @ts-ignore
    return new Proxy(
      {},
      {
        has(target, prop) {
          return map.has(String(prop));
        },
        get(target, prop, receiver) {
          if (prop === 'toJSON') {
            return map.toJSON.bind(map);
          }
          return DeYjsify(map.get(String(prop)));
        },
      },
    );
  }
  // @ts-ignore
  return map;
}

// @ts-ignore
window.DeYjsify = DeYjsify;
