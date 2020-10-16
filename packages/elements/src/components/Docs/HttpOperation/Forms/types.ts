import type { Awareness } from 'y-protocols/awareness';
import type * as Y from 'yjs';

export interface IFormProps {
  nodePath: string;
  propName: string;
  o: Y.Map<any>;
  awareness: Awareness;
  IdMapYjs: Map<string, Y.Map<any>>;
  selected: string;
  selections: Set<string>;
  setSelected: (id?: string) => void;
  setSelections: (selections?: Set<string>) => void;
}
