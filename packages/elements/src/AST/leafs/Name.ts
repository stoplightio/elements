import { ILeaf } from '../basics';

export interface IName extends ILeaf {
  type: 'name';
  value: string;
}
