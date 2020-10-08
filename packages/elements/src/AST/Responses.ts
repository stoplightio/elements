import { IBranch } from './basics';
import { IResponse } from './Response';

export interface IResponses extends IBranch {
  type: 'responses';
  children: IResponse[];
}
