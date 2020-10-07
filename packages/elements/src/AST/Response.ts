import { IBranch } from './basics';
import { IHeaderParams } from './HeaderParams';
import { IDescription, IHttpStatus } from './leafs';
import { IResponseBody } from './ResponseBody';

type IResponseChildren = IHttpStatus | IHeaderParams | IDescription | IResponseBody;

export interface IResponse extends IBranch {
  type: 'response';
  children: IResponseChildren[];
}
