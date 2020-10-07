import { IBranch } from './basics';
import { IHeaderParams } from './HeaderParams';
import { IDescription } from './leafs/Description';
import { IName } from './leafs/Name';
import { IPropertyDeprecated } from './PropertyDeprecated';
import { IPropertyExplode } from './PropertyExplode';
import { IPropertyRequired } from './PropertyRequired';
import { IPropertyStyleHeaderParam } from './PropertyStyleHeaderParam';
import { ISchema } from './Schema';

type IHeaderParamChildren =
  | IName
  | IPropertyStyleHeaderParam
  | IDescription
  | IPropertyExplode
  | IPropertyRequired
  | IPropertyDeprecated
  | ISchema;
//| IExample
//| IEncoding;

export interface IHeaderParam extends IBranch {
  type: 'headerParam';
  parent: IHeaderParams;
  children: IHeaderParamChildren[];
}
