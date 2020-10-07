import { IBranch } from './basics';
import { IParam_Header } from './Param';

export interface IHeaderParams extends IBranch {
  type: 'headerParams';
  children: IParam_Header[];
}
