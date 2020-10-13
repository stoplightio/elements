import * as Y from 'yjs';

import { YifyClassic } from './YjsifyClassic';

export function DeYjsifyClassic<T>(map: YifyClassic<T>): T {
  // @ts-ignore
  if (typeof map !== 'object' || map === null) return map;
  // @ts-ignore
  if (map instanceof Y.Text) return map.toString();
  // @ts-ignore
  if (map instanceof Y.Array) return map.map(x => DeYjsifyClassic(x));
  // @ts-ignore
  return new Proxy(
    {},
    {
      get(target, prop, receiver) {
        if (prop === 'toJSON') {
          // @ts-ignore
          return map.toJSON.bind(map);
        }
        // @ts-ignore
        return DeYjsifyClassic(map.get(prop));
      },
    },
  );
}

// @ts-ignore
window.DeYjsifyClassic = DeYjsifyClassic;
