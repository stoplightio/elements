import * as Y from 'yjs';

import { YifyClassic } from './YjsifyClassic';

export function DeYjsifyClassic<T>(map: YifyClassic<T>): T {
  // @ts-ignore
  if (typeof map !== 'object' || map === null) return map;
  // @ts-ignore
  if (map instanceof Y.Text) return map.toString();
  // @ts-ignore
  if (map instanceof Y.Array) return map.map(x => DeYjsifyClassic(x));

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
          return DeYjsifyClassic(map.get(String(prop)));
        },
      },
    );
  }
  // @ts-ignore
  return map;
}

// @ts-ignore
window.DeYjsifyClassic = DeYjsifyClassic;
