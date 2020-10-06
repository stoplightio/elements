import { WebsocketProvider } from 'y-websocket';
import * as Y from 'yjs';

import { IMagicNode } from '../AST/basics';

export class YDoc {
  public doc: Y.Doc;
  public root: Y.Map<any>;
  public wsProvider: WebsocketProvider;
  public ready: Promise<void>;
  constructor(nodeUri: string) {
    this.doc = new Y.Doc();

    this.root = this.doc.getMap('root');

    this.wsProvider = new WebsocketProvider(
      process.env.NODE_ENV === 'production'
        ? `${location.protocol === 'http:' ? 'ws' : 'wss'}://${location.host}`
        : 'ws://localhost:1234',
      nodeUri,
      this.doc,
      { connect: false },
    );

    // TODO: fire event when ready etc.
    this.ready = new Promise((resolve, reject) => {
      this.wsProvider.once('sync', () => resolve);
      // TODO: Implement a timeout
    });

    this.wsProvider.connect();
  }
}

export class TypedYArray<T> extends Y.Array<T> {
  constructor(args: T[]) {
    super();
    this.push(args);
  }
}

export class TypedYMap<T extends object> extends Y.Map<any> {
  constructor(args: T) {
    super(Object.entries(args));
  }
  set<K extends keyof T & string>(key: K, value: T[K]) {
    super.set(key, value);
  }
  get<K extends keyof T & string>(key: K): T[K] {
    return super.get(String(key));
  }
}

// Replace Objects with TypedYMaps and Arrays with YArrays
export type Yify<T> = T extends Array<infer P>
  ? TypedYArray<Yify<P>>
  : T extends object
  ? TypedYMap<{ [P in keyof Omit<T, 'id' | 'parent'>]: Yify<Omit<T, 'id' | 'parent'>[P]> }>
  : T;

export function getId(node: Y.Map<any> | Y.Array<any>) {
  if (!node._item?.id) {
    throw Error('Unable to get id. Node is either a root node or not integrated into the document yet.');
  }
  return `${node._item.id.client}-${node._item.id.clock}`;
}

export function getParent(node: Y.AbstractType<any>): Y.Map<any> {
  if (node instanceof Y.Array) {
    if (!node._item?.parent) throw Error('Parent not found');
    return node._item.parent as Y.Map<any>;
  }
  if (node instanceof Y.Map) {
    if (!node._item?.parent) throw Error('Parent not found');
    const arr = node._item.parent as Y.Array<any>;
    if (!arr._item?.parent) throw Error('Parent not found');
    return arr._item.parent as Y.Map<any>;
  }
  throw Error('invalid node');
}

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

// @ts-ignore
window.Y = Y;
// @ts-ignore
window.getParent = getParent;
// @ts-ignore
window.getId = getId;
// @ts-ignore
window.Yjsify = Yjsify;
