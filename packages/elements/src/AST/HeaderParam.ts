import { IBranch } from './basics';
import { IHeaderParams } from './HeaderParams';
import { IDescription } from './leafs/Description';
import { IName } from './leafs/Name';
import { IRequired } from './leafs/Required';
import { IPropertyDeprecated } from './PropertyDeprecated';
import { IPropertyExplode } from './PropertyExplode';
import { IPropertyStyleHeaderParam } from './PropertyStyleHeaderParam';
import { ISchema } from './Schema';

type IHeaderParamChildren =
  | IName
  | IPropertyStyleHeaderParam
  | IDescription
  | IPropertyExplode
  | IRequired
  | IPropertyDeprecated
  | ISchema;
//| IExample
//| IEncoding;

export interface IHeaderParam extends IBranch {
  type: 'headerParam';
  parent: IHeaderParams;
  children: IHeaderParamChildren[];
}
