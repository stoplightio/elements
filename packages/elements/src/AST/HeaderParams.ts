import { IBranch } from './basics';
import { IHeaderParam } from './HeaderParam';

export interface IHeaderParams extends IBranch {
  type: 'headerParams';
  children: IHeaderParam[];
}
