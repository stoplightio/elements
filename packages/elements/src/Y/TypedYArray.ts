import * as Y from 'yjs';

export class TypedYArray<T> extends Y.Array<T> {
  constructor(args: T[]) {
    super();
    this.push(args);
  }
}
