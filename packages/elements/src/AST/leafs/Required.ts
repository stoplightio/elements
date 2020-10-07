import { ILeaf } from '../basics';

export interface IRequired extends ILeaf {
  type: 'required';
  value: boolean;
}
