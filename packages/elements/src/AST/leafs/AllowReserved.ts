import { ILeaf } from '../basics';

export interface IAllowReserved extends ILeaf {
  type: 'allowReserved';
  value: boolean;
}
