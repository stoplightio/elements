import { IBranch } from './basics';
import { IParam_Path } from './Param';

export interface IPathParams extends IBranch {
  type: 'pathParams';
  children: IParam_Path[];
}
