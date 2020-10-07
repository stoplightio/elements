import { ILeaf } from '../basics';

export interface IAllowEmptyValue extends ILeaf {
  type: 'allowEmptyValue';
  value: boolean;
}
