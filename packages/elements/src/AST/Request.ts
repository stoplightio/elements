import { IBranch } from './basics';
import { ICookieParams } from './CookieParams';
import { IHeaderParams } from './HeaderParams';
import { IPathParams } from './PathParams';
import { IQueryParams } from './QueryParams';
import { IRequestBody } from './RequestBody';

type IRequestChildren = IPathParams | IQueryParams | IHeaderParams | ICookieParams | IRequestBody;

export interface IRequest extends IBranch {
  type: 'request';
  children: IRequestChildren[];
}
