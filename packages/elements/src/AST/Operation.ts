import { IParent } from './basics';
import { IDeprecated, IDescription, IHttpMethod, IPath } from './leafs';
import { IRequest } from './Request';
import { IResponse } from './Response';
import { IServer } from './Server';

type IOperationChildren = IDescription | IHttpMethod | IPath | IServer | IDeprecated | IRequest | IResponse;

export interface IOperation extends IParent {
  type: 'operation';
  children: IOperationChildren[];
  // callbacks?: IHttpCallbackOperation[];
  // security?: HttpSecurityScheme[][];
}
