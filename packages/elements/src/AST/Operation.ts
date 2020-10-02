import { IParent } from './basics';
import { IPropertyDeprecated } from './PropertyDeprecated';
import { IPropertyDescription } from './PropertyDescription';
import { IPropertyMethod } from './PropertyMethod';
import { IPropertyPath } from './PropertyPath';
import { IRequest } from './Request';
import { IResponse } from './Response';
import { IServer } from './Server';

type IOperationChildren =
  | IPropertyDescription
  | IPropertyMethod
  | IPropertyPath
  | IServer
  | IPropertyDeprecated
  | IRequest
  | IResponse;

export interface IOperation extends IParent {
  type: 'operation';
  children: IOperationChildren[];
  // callbacks?: IHttpCallbackOperation[];
  // security?: HttpSecurityScheme[][];
}
