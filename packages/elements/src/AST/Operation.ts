import { IParent } from './basics';
import { IDescription } from './leafs/Description';
import { IPath } from './leafs/Path';
import { IPropertyDeprecated } from './PropertyDeprecated';
import { IPropertyMethod } from './PropertyMethod';
import { IRequest } from './Request';
import { IResponse } from './Response';
import { IServer } from './Server';

type IOperationChildren = IDescription | IPropertyMethod | IPath | IServer | IPropertyDeprecated | IRequest | IResponse;

export interface IOperation extends IParent {
  type: 'operation';
  children: IOperationChildren[];
  // callbacks?: IHttpCallbackOperation[];
  // security?: HttpSecurityScheme[][];
}
