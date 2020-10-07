import { IBranch } from './basics';
import { IHeaderParam } from './HeaderParam';
import { IDescription, IHttpStatus } from './leafs';
import { IResponseBody } from './ResponseBody';

type IResponseChildren = IHttpStatus | IHeaderParam | IDescription | IResponseBody;

export interface IResponse extends IBranch {
  type: 'response';
  children: IResponseChildren[];
}
