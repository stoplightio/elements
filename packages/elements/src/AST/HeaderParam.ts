import { IBranch } from './basics';
import { IHeaderParams } from './HeaderParams';
import { IDeprecated, IDescription, IExplode, IName, IRequired } from './leafs';
import { IPropertyStyleHeaderParam } from './PropertyStyleHeaderParam';
import { ISchema } from './Schema';

type IHeaderParamChildren =
  | IName
  | IPropertyStyleHeaderParam
  | IDescription
  | IExplode
  | IRequired
  | IDeprecated
  | ISchema;
//| IExample
//| IEncoding;

export interface IHeaderParam extends IBranch {
  type: 'headerParam';
  parent: IHeaderParams;
  children: IHeaderParamChildren[];
}
