import * as Y from 'yjs';

export class TypedYText extends Y.Text {
  constructor(text: string) {
    super();
    this.insert(0, text);
  }
}
