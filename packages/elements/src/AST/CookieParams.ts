import { IBranch } from './basics';
import { IParam_Cookie } from './Param';

export interface ICookieParams extends IBranch {
  type: 'cookieParams';
  children: IParam_Cookie[];
}
