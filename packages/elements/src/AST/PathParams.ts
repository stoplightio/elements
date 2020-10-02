import { IBranch } from './basics';
import { IPathParam } from './PathParam';

export interface IPathParams extends IBranch {
  type: 'pathParams';
  children: IPathParam[];
}
