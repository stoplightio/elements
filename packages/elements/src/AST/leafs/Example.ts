import { ILeaf } from '../basics';

export interface IExample extends ILeaf {
  type: 'example';
  value: string;
}
