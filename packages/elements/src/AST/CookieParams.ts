import { IBranch } from './basics';
import { ICookieParam } from './CookieParam';

export interface ICookieParams extends IBranch {
  type: 'cookieParams';
  children: ICookieParam[];
}
