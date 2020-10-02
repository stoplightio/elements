import { IBranch } from './basics';
import { IQueryParam } from './QueryParam';

export interface IQueryParams extends IBranch {
  type: 'queryParams';
  children: IQueryParam[];
}
