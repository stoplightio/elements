import { IBool, IParent, IProperty, IString } from './basics';
import { IRequest } from './Request';
import { IResponse } from './Response';
import { IServer } from './Server';

export type IDescriptionProperty = IProperty<IString<'description'>, IString>;
export type IMethodProperty = IProperty<IString<'method'>, IString>;
export type IPathProperty = IProperty<IString<'path'>, IString>;
export type IDeprecatedProperty = IProperty<IString<'deprecated'>, IBool>;

type IOperationChildren =
  | IDescriptionProperty
  | IMethodProperty
  | IPathProperty
  | IServer
  | IDeprecatedProperty
  | IRequest
  | IResponse;

export interface IOperation extends IParent {
  type: 'operation';
  children: IOperationChildren[];
  // callbacks?: IHttpCallbackOperation[];
  // security?: HttpSecurityScheme[][];
}
