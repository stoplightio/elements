import { IParent } from './basics';
import { IOperation } from './Operation';
import { IService } from './Service';

type IRootChildren = IService | IOperation;

export interface IRoot extends IParent {
  type: 'root';
  children: IRootChildren[];
}
