import * as Y from 'yjs';

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
