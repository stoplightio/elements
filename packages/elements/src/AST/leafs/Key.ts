import { ILeaf } from '../basics';

export interface IKey extends ILeaf {
  type: 'key';
  value: string;
}
