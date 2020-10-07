import { IBranch } from './basics';
import { IParam_Query } from './Param';

export interface IQueryParams extends IBranch {
  type: 'queryParams';
  children: IParam_Query[];
}
