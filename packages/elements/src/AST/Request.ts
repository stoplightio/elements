import { IBranch } from './basics';
import { ICookieParam } from './CookieParam';
import { IHeaderParam } from './HeaderParam';
import { IPathParam } from './PathParam';
import { IQueryParam } from './QueryParam';
import { IRequestBody } from './RequestBody';

type IRequestChildren = IPathParam | IQueryParam | IHeaderParam | ICookieParam | IRequestBody;

export interface IRequest extends IBranch {
  type: 'request';
  children: IRequestChildren[];
}
