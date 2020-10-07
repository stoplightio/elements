import { ILeaf } from '../basics';

export interface IExplode extends ILeaf {
  type: 'explode';
  value: boolean;
}
